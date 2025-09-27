Here’s a concise walk-through of what your current code is doing, where the “half-rendered page after the token expires” comes from, and what you can change to handle it cleanly.

---

## 1️⃣  What’s happening now

### Token lifetime

* **`JwtUtil.java`**
  *Every* token is valid for **24 hours** (`EXPIRATION_TIME = 86400000` ms).
  After that the `validateToken` method throws a `JwtException` and returns `null`.

### Backend on expired token

* **`JwtAuthenticationFilter`**
  If the token is missing or `validateToken` returns `null`, the filter simply calls
  `filterChain.doFilter(request, response)` with no authentication set.
  **Spring Security** then sees “no authentication for a protected path” and returns **HTTP 401**.

### Frontend

* **`AuthContext.tsx`**
  At startup it only checks “does a token string exist in `localStorage`?”:

  ```ts
  setIsAuthenticated(!!token);
  ```

  It **never** checks whether the token is expired.
  So after 24 h you still have a token in `localStorage`, `isAuthenticated` stays `true`, and
  your `ProtectedRoute` happily renders the protected pages.

* When the first API call fires (e.g. `fetchPaginatedPosts`) the backend returns 401.
  Your fetch helpers in `api.ts` just `throw new Error("Failed to fetch…")`.
  The components catch nothing special → they render partially or break, leaving you on a “half page”.

---

## 2️⃣  Immediate fixes

### A. Detect expiry on the client

Add a simple check when the app starts and whenever the tab regains focus.

```ts
// src/auth.ts
export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= now;
  } catch {
    return true;
  }
};
```

Update **AuthContext**:

```tsx
useEffect(() => {
  const token = getToken();
  setIsAuthenticated(!!token && !isTokenExpired(token));
  setIsAuthLoading(false);
}, []);

useEffect(() => {
  const onFocus = () => {
    const token = getToken();
    if (!token || isTokenExpired(token)) handleLogout();
  };
  window.addEventListener("focus", onFocus);
  return () => window.removeEventListener("focus", onFocus);
}, []);
```

Now `isAuthenticated` will flip to `false` as soon as the tab gains focus after an expiration.

---

### B. Handle 401s globally

Wrap `fetch` so that **any** 401 forces logout and redirect:

```ts
// src/api.ts
async function authFetch(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem("token");
  const headers = { ...init?.headers, Authorization: token ? `Bearer ${token}` : "" };
  const res = await fetch(input, { ...init, headers });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return Promise.reject(new Error("Unauthorized"));
  }
  return res;
}

// then use authFetch everywhere instead of bare fetch
```

This guarantees that even if a page is already mounted, the first failed call sends the user to `/login`.

---

## 3️⃣  (Optional) Better UX later

* **Refresh tokens**: issue a short-lived access token (15 min) and a long-lived refresh token (HttpOnly cookie).
  On 401 the frontend silently calls `/auth/refresh`, then retries the request.
* **React Query / SWR**: centralize API calls so error handling and cache invalidation are automatic.

---

## 4️⃣  Quick checklist

| Area                   | Current behaviour                             | Desired fix                            |
| ---------------------- | --------------------------------------------- | -------------------------------------- |
| AuthContext init       | Only checks for token string                  | Check token expiry                     |
| When tab regains focus | Nothing                                       | Re-check token + logout if expired     |
| API calls after expiry | Throw generic error, UI half-renders          | Intercept 401 → clear token + redirect |
| Backend                | Correct: returns 401 on expired/invalid token | (optional) add refresh endpoint later  |

---

### TL;DR

Your backend already expires tokens and returns 401 correctly.
The frontend *trusts the presence of the string* instead of its validity.
Add **expiry checks in `AuthContext`** and a **401 interceptor/wrapper** around `fetch`.
Then the moment the tab is opened after the token’s 24 h lifetime, the app will either:

* Immediately log out on focus, or
* Redirect on the first API call—no more “half-rendered Home page.”
