'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado'
import NavPrivado from '@/app/componentes/navs/nav-privado'
import Sidebar from '@/app/componentes/siders/sidebar'
import ListarUsuarios from '@/app/componentes/administrador/usuarios/listarUsuario'
import { useSidebar } from '@/context/AppContext'

function Page () {
  const router = useRouter()
  const breadcrumbs = ['privado', 'Administrador', 'Usuarios', 'Listar']
  const { isSidebarToggled } = useSidebar()

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
          <div id='layoutAuthentication'>
            <div id='layoutAuthentication_content'>
              <main>
                <HeaderPagePrivado breadcrumbs={breadcrumbs} />
                <ListarUsuarios />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Page
