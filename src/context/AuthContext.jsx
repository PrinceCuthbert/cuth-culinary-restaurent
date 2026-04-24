import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing authentication on app load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // Validate token with backend
          // const response = await fetch('/api/auth/validate', {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // if (response.ok) {
          //   const userData = await response.json();
          //   setUser(userData);
          //   setIsAuthenticated(true);
          // }

          // For demo purposes, assume token is valid
          setUser({ name: "Demo User", email: "demo@example.com" });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);

      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              json: () =>
                Promise.resolve({
                  token: "demo-token",
                  user: { name: "Demo User", email },
                }),
            }),
          1000,
        ),
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    try {
      setLoading(true);

      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              json: () =>
                Promise.resolve({
                  token: "demo-token",
                  user: { name: fullName, email },
                }),
            }),
          1000,
        ),
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: "Registration failed" };
      }
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
