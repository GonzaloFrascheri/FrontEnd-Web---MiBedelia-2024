'use client'
import React, { useEffect, useState } from 'react'
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx'
import Sidebar from '@/app/componentes/siders/sidebar.jsx'
import VerPerfil from '@/app/componentes/perfil/verPerfil.jsx'
import storage from '@/utils/storage'
import { useAuth } from '@/context/AuthProvider'

function VerPerfilPage () {
  const authData = useAuth()
  const token = storage.getToken()
  const [estado, setEstado] = useState({
    message: '',
    estado: 0
  })
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
  const [data, setData] = useState('')

  useEffect(() => {
    if (authData && !data) {
      setData(authData)
    }
  }, [authData, data])

  useEffect(() => {
    fetch('http://localhost:8080/usuario/getUsuario', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      mode: 'cors'
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Error en la conexión.')
        }
        setEstado({
          estado: res.status
        })
        return res.json()
      })
      .then(data => {
        setCredentials(data)
      })
      .catch(error => {
        console.error('Hubo un problema en el fecth:', error)
      })
  }, [])

  return (
    <>
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
              <VerPerfil credentials={credentials} />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default VerPerfilPage
