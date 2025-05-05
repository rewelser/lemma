const API_BASE_URL = "http://localhost:8080"; // adjust when needed

export const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });
    
        if (!response.ok) {
            throw new Error("registration failed.");
        }
    
        return true; // return success

    } catch (error) {
        console.error("Registration error:", error);
        return false;
    }
}

export const login = async (username: string, password: string): Promise<string | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) {
            throw new Error("Invalid login credentials.");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data.token;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};

export const logout = (): void => {
    localStorage.removeItem("token");
};

export const getToken = (): string | null => {
    return localStorage.getItem("token");
};