import React, { createContext, useState, useEffect, useContext } from "react";
import { login } from "../domain/Login";

interface UserContextType {
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}



// create context
const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({children}: {children: React.ReactNode}) => {
  // the value that will be given to the context
  const [user, setUser] = useState<any | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      const userData = await login(username, password);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

// context consumer hook
const useUserContext = () => {
  // get the context
  const context = useContext(UserContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export default useUserContext;
