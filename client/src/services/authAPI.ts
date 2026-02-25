import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:4000/api/v1";

interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  message: string;
}

export const authAPI = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/signup`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/login`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  checkUserExists: async (
    email: string,
  ): Promise<{ success: boolean; exists: boolean; message: string }> => {
    const response = await axios.post(
      `${API_BASE_URL}/check-user`,
      { email },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },

  verifyToken: async (
    token?: string,
  ): Promise<{
    success: boolean;
    valid: boolean;
    user?: any;
    token?: string;
    message: string;
  }> => {
    const response = await axios.post(
      `${API_BASE_URL}/verify-token`,
      {},
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      },
    );
    return response.data;
  },

  googleLogin: async (data: {
    email: string;
    name: string;
    picture?: string;
    googleId?: string;
  }): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/google-login`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPicture");
  },

  getToken: () => {
    const token = localStorage.getItem("token");
    return token && token !== "undefined" ? token : null;
  },

  getUser: () => {
    try {
      const user = localStorage.getItem("user");
      if (!user || user === "undefined" || user === "null") {
        return null;
      }
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  },

  setAuthData: (token: string, user: any) => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userName", user.name || "");
    }
  },
};
