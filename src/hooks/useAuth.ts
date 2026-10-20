"use client";

import { useState } from "react";
import { User } from "@/types";
import { authService } from "@/services/authService";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  const login = async (email: string) => {
    setLoading(true);
    const loggedInUser = await authService.login(email);
    setUser(loggedInUser);
    setLoading(false);
    return loggedInUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isPartner: user?.role === "partner",
    login,
    logout,
  };
}
