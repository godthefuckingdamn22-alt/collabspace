import { useEffect, useState } from "react";

import type { ReactNode } from "react";

import { apiRequest } from "../services/api";
import { AuthContext } from "./auth-context";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await apiRequest("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await apiRequest("/auth/logout", {
        method: "POST",
      });
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await refreshUser();
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}