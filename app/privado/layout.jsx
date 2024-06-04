'use client'
import { AuthProvider } from '@/context/AuthProvider'
import { SidebarProvider } from '@/context/AppContext'
import React from 'react'

export default function PrivadoLayout ({ children }) {
  return (
    <SidebarProvider>
      <AuthProvider>
        <body className='nav-fixed sidenav-toggled'>{children}</body>
      </AuthProvider>
    </SidebarProvider>
  )
}
