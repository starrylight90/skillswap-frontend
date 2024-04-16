// context.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const LoggedInUserContext = createContext();

export const useLoggedInUser = () => useContext(LoggedInUserContext);

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    // Initialize loggedInUser state with data from localStorage, if available
    const storedUser = sessionStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Update localStorage whenever loggedInUser state changes
    if (loggedInUser) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
      sessionStorage.removeItem('loggedInUser');
    }
  }, [loggedInUser]);

  const updateLoggedInUser = (userData) => {
    setLoggedInUser(userData);
  };

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, updateLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
