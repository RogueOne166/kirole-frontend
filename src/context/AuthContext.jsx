import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);

      // sync axios header
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    if (!data?.token || !data?.user) return;

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    //  set header immediately
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  const logout = () => {
    setUser(null);
    setToken("");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    //  remove header
    delete api.defaults.headers.common["Authorization"];
  };

  const isOrganizer = user?.role === "organizer";
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isOrganizer,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
