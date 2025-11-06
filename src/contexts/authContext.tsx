import React, { createContext, useState, useContext, useEffect } from "react";

type User = {
    name: string;
};

type AuthContextType = {
    user: User | null;
    logout: () => void;
    isLoggedIn: boolean;
};

// 创建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // 从 localStorage 初始化用户状态
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const payloadBase64 = token.split(".")[1];
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);
            setUser({ name: payload.uniqueName || null });
        } catch {
            setUser(null);
        }
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
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
