import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import app from "../firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth(app);

  const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
    setUser(loggedInUser);
    // setIsLoggedIn((prev) => !prev);
    loggedInUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setLoading(false);
  });

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
