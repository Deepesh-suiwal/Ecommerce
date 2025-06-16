import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import instance from "../axiosConfig";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(false);

  useEffect(() => {
    checkToken();
  }, [user]);

  console.log(user)

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
    <AuthContext.Provider value={{ user,setUser}}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
