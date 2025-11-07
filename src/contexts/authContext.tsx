import React, { createContext, useState, useContext, useEffect } from "react";
import { identityService } from "../services/identityServices";
import type { LoginRequest, LoginResponse } from "../types/identity/login";
import type { ApiResponse } from "../types/apiResponse";

type User = {
    name: string;
};

type AuthContextType = {
    user: User | null;
    login: (request: LoginRequest) => Promise<ApiResponse<LoginResponse>>;
    logout: () => void;
    isLoggedIn: boolean;
};

// 创建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    function updateUserFromToken() {
        const token = localStorage.getItem("jwt");
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const payloadBase64 = token.split(".")[1];
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);
            if (isExpired(payload.exp)) {
                setUser(null);
                localStorage.removeItem("jwt");
                return;
            }
            setUser({ name: payload.unique_name || null });
        } catch {
            setUser(null);
        }
    }

    // 从 localStorage 初始化用户状态
    useEffect(() => {
        updateUserFromToken();
    }, []);

    const login = async (request: LoginRequest) => {
        const response = await identityService.login(request);
        if (response.code !== 200) {
            return response;
        }
        localStorage.setItem("jwt", response.data?.token || "");
        updateUserFromToken();
        return response;
    }

    const logout = async () => {
        setUser(null);
        await identityService.logout();
        localStorage.removeItem("jwt");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLoggedIn: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 定义一个便捷 Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

function isExpired(timestamp: number): boolean {
    const getUnixTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);
    return getUnixTimestamp() > timestamp;
}
