import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const SidebarProvider = ({ children }) => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarToggled(prevState => !prevState)
  }

  return (
    <AppContext.Provider value={{ isSidebarToggled, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  )
}

export const useSidebar = () => useContext(AppContext)
