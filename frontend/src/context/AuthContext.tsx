import { createContext, useState, useEffect, ReactNode } from "react";
import { getToken, logout, isTokenExpired } from "../auth";

interface AuthContextType {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true); // ← NEW

    useEffect(() => {
        const token = getToken();
        setIsAuthenticated(!!token && !isTokenExpired(token)); // Update state based on whether a token exists, and if it's expired
        setIsAuthLoading(false); // ← Done loading
    }, []);

    // Listen for cross-tab auth changes
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
        if (e.key === "token" || e.key === "auth_event") {
            const token = getToken();
            setIsAuthenticated(!!token && !isTokenExpired(token));
        }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    useEffect(() => {
        const onFocus = () => {
            const token = getToken();
            if (!token || isTokenExpired(token)) handleLogout();
        };
        window.addEventListener("focus", onFocus);
        return () => window.removeEventListener("focus", onFocus);
    }, []);

    const handleLogin = (token: string) => {
        localStorage.setItem("token", token);
        // notify other tabs
        localStorage.setItem("auth_event", `login:${Date.now()}`);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        logout();
        // notify other tabs
        localStorage.setItem("auth_event", `logout:${Date.now()}`);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAuthLoading, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
