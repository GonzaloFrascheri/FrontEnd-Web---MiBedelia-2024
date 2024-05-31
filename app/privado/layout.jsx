'use client'
import { AuthProvider } from '@/context/AuthProvider'
import React from 'react'

export default function PrivadoLayout ({ children }) {
  return (
    <html lang='es'>
      <AuthProvider>
        <body className='nav-fixed sidenav-toggled'>{children}</body>
      </AuthProvider>
    </html>
  )
}
