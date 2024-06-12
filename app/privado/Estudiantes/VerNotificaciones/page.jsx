'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import storage from '@/utils/storage'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import ComponenteVerNotificaciones from '@/app/componentes/estudiantes/verNotificaciones/verNotificaciones.jsx'

function VerNotificaciones () {
  let authData = useAuth()
  const [userData, setUserData] = useState(null)
  const { isSidebarToggled } = useSidebar()
  // Check session
  useEffect(() => {
    if (authData && !userData) {
      setUserData(authData)
    }
  }, [authData, userData])

  return (
    <body
      className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}
    >
      <NavPrivado />
      <div id='layoutSidenav'>
        <div id='layoutSidenav_nav'>
          <Sidebar />
        </div>
        <div id='layoutSidenav_content'>
          <main>
            <header className='page-header page-header-compact page-header-light border-bottom bg-white mb-4'>
              <div className='container-xl px-4'>
                <div className='page-header-content'>
                  <div className='row align-items-center justify-content-between pt-3'>
                    <div className='col-auto mb-3'>
                      <h1 className='page-header-title'>
                        <div className='page-header-icon'>
                          <FontAwesomeIcon icon={faUserAlt} />
                        </div>
                        Configuracion de cuenta - Notificaciones
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className='container-xl px-4 mt-4'>
                <ComponenteVerNotificaciones />
            </div>
          </main>
        </div>
      </div>
    </body>
  )
}

export default VerNotificaciones