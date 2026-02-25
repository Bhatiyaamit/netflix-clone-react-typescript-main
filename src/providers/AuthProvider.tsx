import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "src/services/authAPI";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (
    email: string,
    name: string,
    picture?: string,
    googleId?: string,
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = authAPI.getToken();
      const savedUser = authAPI.getUser();
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }
    } catch (error) {
      console.error("Error initializing auth state:", error);
      // Clear invalid auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        authAPI.setAuthData(response.token, response.user);
      } else {
        throw new Error(response.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.signup({
        name,
        email,
        password,
        role: "Visitor",
      });
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        authAPI.setAuthData(response.token, response.user);
      } else {
        throw new Error(response.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (
    email: string,
    name: string,
    picture?: string,
    googleId?: string,
  ) => {
    setIsLoading(true);
    try {
      const response = await authAPI.googleLogin({
        email,
        name,
        picture,
        googleId,
      });
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        authAPI.setAuthData(response.token, response.user);
      } else {
        throw new Error(response.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    signup,
    googleLogin,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
