'use client'
import React, { useEffect, useState } from 'react'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import VerPerfil from '@/app/componentes/perfil/verPerfil.jsx'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'

function VerPerfilPage () {
  const authData = useAuth()
  const [credentials, setCredentials] = useState({
    id: '',
    nombre: '',
    username: '',
    apellido: '',
    email: '',
    telefono: '',
    status: '',
    rol: '',
    uidgoogle: ''
  })
  const [userData, setUserData] = useState('')
  const { isSidebarToggled } = useSidebar()

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
                          <i data-feather='user'></i>
                        </div>
                        Configuracion de cuenta - Perfil
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className='container-xl px-4 mt-4'>
              <VerPerfil
                setCredentials={setCredentials}
                credentials={credentials}
              />
            </div>
          </main>
        </div>
      </div>
    </body>
  )
}

export default VerPerfilPage
