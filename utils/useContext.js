"use client";
import React, { createContext, useContext, useState } from "react";

// Create the UserContext
export const GlobalContext = createContext();

// Create the UserProvider component to wrap the app and provide the context value
export function GlobalContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});
  const [search, setSearch] = useState("");

  function login(userData) {
    setUserDetails(userData);
  }

  return (
    <GlobalContext.Provider value={{ userDetails, login, search, setSearch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);


