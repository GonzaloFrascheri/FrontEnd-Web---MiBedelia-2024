'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import MainDashboard from '@/app/componentes/main/dashboard.jsx'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import Footer from '@/app/componentes/main/footer'
import { useAuth } from '@/context/AuthProvider'

function PrivadoPage () {
  const authData = useAuth()
  const [data, setData] = useState('')

  const [isSidebarToggled, setIsSidebarToggled] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled)
  }

  useEffect(() => {
    if (authData && !data) {
      setData(authData)
    }
  }, [authData, data])

  return (
    <body
      className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}
    >
      <NavPrivado
        isSidebarToggled={isSidebarToggled}
        toggleSidebar={toggleSidebar}
      />
      <div id='layoutSidenav'>
        <div id='layoutSidenav_nav'>
          <Sidebar isSidebarToggled={isSidebarToggled} />
        </div>
        <div id='layoutSidenav_content'>
          <MainDashboard data={data} />
          <Footer />
        </div>
      </div>
    </body>
  )
}

export default PrivadoPage
