import { useSidebar } from '@/context/AppContext'
import { useAuth } from '@/context/AuthProvider'
import {
  faAngleDown,
  faArrowsToCircle,
  faGraduationCap,
  faPenFancy,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export default function Sidebar () {
  const authData = useAuth()
  const [userData, setUserData] = useState(null)
  const { isSidebarToggled } = useSidebar()
  const [collapseAdministrador, setCollapseAdministrador] = useState(false)
  const [collapseCoordinador, setCollapseCoordinador] = useState(false)
  const [collapseFuncionario, setCollapseFuncionario] = useState(false)
  const [collapseEstudiante, setCollapseEstudiante] = useState(false)

  const toggleCollapseAdministrador = () => {
    setCollapseAdministrador(!collapseAdministrador)
  }

  const toggleCollapseCoordinador = () => {
    setCollapseCoordinador(!collapseCoordinador)
  }

  const toggleCollapseFuncionario = () => {
    setCollapseFuncionario(!collapseFuncionario)
  }

  const toggleCollapseEstudiante = () => {
    setCollapseEstudiante(!collapseEstudiante)
  }

  useEffect(() => {
    if (authData && !userData) {
      setUserData(authData)
    }
  }, [authData, userData])

  return (
    isSidebarToggled && (
      <nav className='sidenav shadow-right sidenav-light'>
        <div className='sidenav-menu'>
          <div className='nav accordion' id='accordionSidenav'>
            <div className='sidenav-menu-heading'>Principal</div>

            {userData && (
              <>
                {/* Administrador */}
                {userData.role === 'ADMIN' && (
                  <>
                    <a
                      className='nav-link collapsed'
                      onClick={toggleCollapseAdministrador}
                      aria-expanded={collapseAdministrador ? 'true' : 'false'}
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseAdministrador'
                      aria-controls='collapseAdministrador'
                    >
                      <div className='nav-link-icon'>
                        <FontAwesomeIcon icon={faUserTie} />
                      </div>
                      Administrador
                      <div className='sidenav-collapse-arrow'>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    </a>
                    <div
                      className={`collapse ${
                        collapseAdministrador ? 'show' : ''
                      }`}
                      id='collapseAdministrador'
                      data-bs-parent='#accordionSidenav'
                    >
                      <nav
                        className='sidenav-menu-nested nav accordion'
                        id='accordionSidenavPages'
                      >
                        <a
                          className='nav-link'
                          href='/privado/Administrador/Usuarios/Alta'
                        >
                          Alta de Usuario
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Administrador/Usuarios/Baja'
                        >
                          Baja de Usuario
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Administrador/Usuarios/Listar'
                        >
                          Listar Usuarios
                        </a>
                      </nav>
                    </div>
                  </>
                )}

                {/* Coordinador */}
                {(userData.role === 'COORDINADOR' ||
                  userData.role === 'ADMIN') && (
                  <>
                    <a
                      className='nav-link collapsed'
                      onClick={toggleCollapseCoordinador}
                      aria-expanded={collapseCoordinador ? 'true' : 'false'}
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseCoordinador'
                      aria-controls='collapseCoordinador'
                    >
                      <div className='nav-link-icon'>
                        <FontAwesomeIcon icon={faArrowsToCircle} />
                      </div>
                      Coordinador
                      <div className='sidenav-collapse-arrow'>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    </a>
                    <div
                      className={`collapse ${
                        collapseCoordinador ? 'show' : ''
                      }`}
                      id='collapseCoordinador'
                      data-bs-parent='#accordionSidenav'
                    >
                      <nav
                        className='sidenav-menu-nested nav accordion'
                        id='accordionSidenavPages'
                      >
                        <a
                          className='nav-link'
                          href='/privado/Coordinador/Carrera/Alta'
                        >
                          Alta Carrera
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Coordinador/Asignatura/Alta'
                        >
                          Alta Asignatura
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Coordinador/Asignatura/Listar'
                        >
                          Listar asignaturas por carreras
                        </a>
                        <a className="nav-link" href="/privado/Coordinador/Registrar/Previatura">
                          Registrar previatura
                        </a>
                        <a className="nav-link" href="/privado/Coordinador/Listar/PreviasPorAsignatura">
                          Listar previas por asignatura
                        </a>
                      </nav>
                    </div>
                  </>
                )}

                {/* Funcionario */}
                {(userData.role === 'FUNCIONARIO' ||
                  userData.role === 'ADMIN') && (
                  <>
                    <a
                      className='nav-link collapsed'
                      onClick={toggleCollapseFuncionario}
                      aria-expanded={collapseFuncionario ? 'true' : 'false'}
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseFuncionario'
                      aria-controls='collapseFuncionario'
                    >
                      <div className='nav-link-icon'>
                        <FontAwesomeIcon icon={faPenFancy} />
                      </div>
                      Funcionario
                      <div className='sidenav-collapse-arrow'>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    </a>
                    <div
                      className={`collapse ${
                        collapseFuncionario ? 'show' : ''
                      }`}
                      id='collapseFuncionario'
                      data-bs-parent='#accordionSidenav'
                    >
                      <nav
                        className='sidenav-menu-nested nav accordion'
                        id='accordionSidenavPages'
                      >
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Generar/ActaExamen'
                        >
                          Generar acta examen
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Registro/ActaExamen'
                        >
                          Registrar acta de examen
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Generar/ActaFinDeCurso'
                        >
                          Generar acta fin de curso
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Registro/ActaFinDeCurso'
                        >
                          Registrar acta de fin de curso
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Registro/HorarioAsignatura'
                        >
                          Registro de horario a asignatura
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Registro/PeriodoExamen'
                        >
                          Registro periodo de examen
                        </a>

                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Modificar/HorarioAsignatura'
                        >
                          Modificar horario de asignatura
                        </a>

                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Modificar/HorarioExamen'
                        >
                          Modificar horario de examen
                        </a>

                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Registro/AltaExamen'
                        >
                          Alta de examen
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/AltaDocente'
                        >
                          Alta docente
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Listar'
                        >
                          Listar estudiantes inscriptos en asignatura
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Funcionario/Listar/Periodo'
                        >
                          Listar exámenes a tomar en período
                        </a>
                      </nav>
                    </div>
                  </>
                )}

                {/* Estudiante */}
                {(userData.role === 'ESTUDIANTE' ||
                  userData.role === 'ADMIN') && (
                  <>
                    <a
                      className='nav-link collapsed'
                      onClick={toggleCollapseEstudiante}
                      aria-expanded={collapseEstudiante ? 'true' : 'false'}
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseEstudiante'
                      aria-controls='collapseEstudiante'
                    >
                      <div className='nav-link-icon'>
                        <FontAwesomeIcon icon={faGraduationCap} />
                      </div>
                      Estudiante
                      <div className='sidenav-collapse-arrow'>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    </a>
                    <div
                      className={`collapse ${collapseEstudiante ? 'show' : ''}`}
                      id='collapseEstudiante'
                      data-bs-parent='#accordionSidenav'
                    >
                      <nav
                        className='sidenav-menu-nested nav accordion'
                        id='accordionSidenavPages'
                      >
                        <a
                          className='nav-link'
                          href='/privado/Estudiantes/Carrera'
                        >
                          Inscripción a una carrera
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Estudiantes/Asignatura'
                        >
                          Inscripción a una asignatura
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Estudiantes/Examen'
                        >
                          Inscripción a un exámen
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Estudiantes/Asignatura/Pendiente'
                        >
                          Asignaturas pendientes
                        </a>
                        <a
                          className='nav-link'
                          href='/privado/Estudiantes/Asignatura/Aprobada'
                        >
                          Asignaturas aprobadas
                        </a>
                      </nav>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className='sidenav-footer'>
          <div className='sidenav-footer-content'>
            <div className='sidenav-footer-subtitle'>
              Conectado como: {userData ? userData.name : 'Cargando...'}
            </div>
            <div className='sidenav-footer-title'>
              {userData ? userData.role : 'Cargando...'}
            </div>
          </div>
        </div>
      </nav>
    )
  )
}
