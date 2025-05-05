import { createContext, useState, useEffect, ReactNode } from "react";
import { getToken, logout } from "../auth";

interface AuthContextType {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true); // ← NEW

    useEffect(() => {
        const token = getToken();
        setIsAuthenticated(!!token); // Update state based on whether a token exists
        setIsAuthLoading(false); // ← Done loading
    }, []);

    const handleLogin = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAuthLoading, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};