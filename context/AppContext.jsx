'use client';
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  // Agrega otros estados y funciones que necesites compartir
  const [globalVariable, setGlobalVariable] = useState('');

  return (
    <AppContext.Provider value={{ isSidebarToggled, toggleSidebar, globalVariable, setGlobalVariable }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
