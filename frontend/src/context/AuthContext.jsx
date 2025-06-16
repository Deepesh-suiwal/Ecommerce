import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const res = await instance.get("/auth/checkToken", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser(true);
      }
    } catch (error) {
      setUser(false);
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
