'use client'
import React, { useEffect, useState } from 'react'
import NavPrivado from '@/app/componentes/navs/nav-privado'
import Sidebar from '@/app/componentes/siders/sidebar'
import InscripcionCarrera from '@/app/componentes/estudiantes/carrera/inscripcionCarrera'
import HeaderPagePrivado from '@/app/componentes/headers/headerPage-privado'
import axios from '@/utils/axios'
import { userAuthenticationCheck } from '@/utils/auth'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

function EstudianteInscripcionCarrera () {
  const router = useRouter()
  const pathname = usePathname()
  const breadcrumbs = ['privado', 'Estudiantes', 'Carrera']
  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })
  const [userData, setUserData] = useState('')
  const [careers, setCareers] = useState([])
  const [careesAreLoading, setCareesAreLoading] = useState(true)
  const [selectedCareer, setSelectedCareer] = useState('')

  useEffect(() => {
    const userData = userAuthenticationCheck(router, pathname)
    setUserData(userData)

    const fetchCareers = async () => {
      try {
        const response = await axios.get('/Funcionario/listarCarrera')
        const { status, data } = response
        if (status === 200) {
          setCareers([...data])
          setCareesAreLoading(false)
        }
      } catch (error) {
        const { status, data } = error.response
        setEstado({
          estado: status,
          message: data.message
        })
      }
    }
    fetchCareers()
  }, [router, pathname])

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const response = await axios.post(
        `/Estudiante/inscripcionCarrera?carreraId=${selectedCareer}&estudianteId=${userData.id}`
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const onCareerChange = e => {
    setSelectedCareer(e.target.value)
  }

  const [isSidebarToggled, setIsSidebarToggled] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled)
  }

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
          <div id='layoutAuthentication'>
            <div id='layoutAuthentication_content'>
              <main>
                <HeaderPagePrivado breadcrumbs={breadcrumbs} />
                <InscripcionCarrera
                  estanCargandoCarreras={careesAreLoading}
                  carreras={careers}
                  seleccionarCarrera={onCareerChange}
                  estado={estado}
                  handleSubmit={handleSubmit}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default EstudianteInscripcionCarrera
