import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSidebar } from '@/context/AppContext'
import { useAuth } from '@/context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faArrowsToCircle,
  faGraduationCap,
  faPenFancy,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'

export default function Sidebar () {
  const authData = useAuth()
  const [userData, setUserData] = useState(null)
  const { isSidebarToggled } = useSidebar()
  const [collapseAdministrador, setCollapseAdministrador] = useState(false)
  const [collapseCoordinador, setCollapseCoordinador] = useState(false)
  const [collapseFuncionario, setCollapseFuncionario] = useState(false)
  const [collapseEstudiante, setCollapseEstudiante] = useState(false)
  
  const router = useRouter()
  const currentPath = usePathname()

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

  const isActive = (path) => currentPath === path;

  const isAnyChildActive = (paths) => paths.some(path => isActive(path));

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
                      className={`nav-link collapsed ${isAnyChildActive([
                        '/privado/Administrador/Usuarios/Alta',
                        '/privado/Administrador/Usuarios/Baja',
                        '/privado/Administrador/Usuarios/Listar'
                      ]) ? 'active' : ''}`}
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
                      className={`collapse ${collapseAdministrador ? 'show' : ''}`}
                      id='collapseAdministrador'
                      data-bs-parent='#accordionSidenav'
                    >
                      <nav className='sidenav-menu-nested nav accordion' id='accordionSidenavPages'>
                        <a className={`nav-link ${isActive('/privado/Administrador/Usuarios/Alta') ? 'active' : ''}`} href='/privado/Administrador/Usuarios/Alta'>
                          Alta de Usuario
                        </a>
                        <a className={`nav-link ${isActive('/privado/Administrador/Usuarios/Baja') ? 'active' : ''}`} href='/privado/Administrador/Usuarios/Baja'>
                          Baja de Usuario
                        </a>
                        <a className={`nav-link ${isActive('/privado/Administrador/Usuarios/Listar') ? 'active' : ''}`} href='/privado/Administrador/Usuarios/Listar'>
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
                      className={`nav-link collapsed ${isAnyChildActive([
                        '/privado/Coordinador/Carrera/Alta',
                        '/privado/Coordinador/Asignatura/Alta',
                        '/privado/Coordinador/Asignatura/Listar',
                        '/privado/Coordinador/Registrar/Previatura',
                        '/privado/Coordinador/Listar/PreviasPorAsignatura'
                      ]) ? 'active' : ''}`}
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
                      className={`collapse ${collapseCoordinador ? 'show' : ''}`}
                      id='collapseCoordinador'
                      data-bs-parent='#accordionSidenav'
                    >
                      <nav className='sidenav-menu-nested nav accordion' id='accordionSidenavPages'>
                        <a className={`nav-link ${isActive('/privado/Coordinador/Carrera/Alta') ? 'active' : ''}`} href='/privado/Coordinador/Carrera/Alta'>
                          Alta Carrera
                        </a>
                        <a className={`nav-link ${isActive('/privado/Coordinador/Asignatura/Alta') ? 'active' : ''}`} href='/privado/Coordinador/Asignatura/Alta'>
                          Alta Asignatura
                        </a>
                        <a className={`nav-link ${isActive('/privado/Coordinador/Asignatura/Listar') ? 'active' : ''}`} href='/privado/Coordinador/Asignatura/Listar'>
                          Listar asignaturas por carreras
                        </a>
                        <a className={`nav-link ${isActive('/privado/Coordinador/Registrar/Previatura') ? 'active' : ''}`} href='/privado/Coordinador/Registrar/Previatura'>
                          Registrar previatura
                        </a>
                        <a className={`nav-link ${isActive('/privado/Coordinador/Listar/PreviasPorAsignatura') ? 'active' : ''}`} href='/privado/Coordinador/Listar/PreviasPorAsignatura'>
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
                      className={`nav-link collapsed ${isAnyChildActive([
                        '/privado/Funcionario/Generar/ActaExamen',
                        '/privado/Funcionario/Registro/ActaExamen',
                        '/privado/Funcionario/Generar/ActaFinDeCurso',
                        '/privado/Funcionario/Registro/ActaFinDeCurso',
                        '/privado/Funcionario/Registro/HorarioAsignatura',
                        '/privado/Funcionario/Registro/PeriodoExamen',
                        '/privado/Funcionario/Modificar/HorarioAsignatura',
                        '/privado/Funcionario/Modificar/HorarioExamen',
                        '/privado/Funcionario/Registro/AltaExamen',
                        '/privado/Funcionario/AltaDocente',
                        '/privado/Funcionario/Listar/Inscriptos',
                        '/privado/Funcionario/Listar/Periodo'
                      ]) ? 'active' : ''}`}
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
                      className={`collapse ${collapseFuncionario ? 'show' : ''}`}
                      id='collapseFuncionario'
                      data-bs-parent='#accordionSidenav'
                    >
                      <nav className='sidenav-menu-nested nav accordion' id='accordionSidenavPages'>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Generar/ActaExamen') ? 'active' : ''}`} href='/privado/Funcionario/Generar/ActaExamen'>
                          Generar acta examen
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Registro/ActaExamen') ? 'active' : ''}`} href='/privado/Funcionario/Registro/ActaExamen'>
                          Registrar acta de examen
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Generar/ActaFinDeCurso') ? 'active' : ''}`} href='/privado/Funcionario/Generar/ActaFinDeCurso'>
                          Generar acta fin de curso
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Registro/ActaFinDeCurso') ? 'active' : ''}`} href='/privado/Funcionario/Registro/ActaFinDeCurso'>
                          Registrar acta fin de curso
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Registro/HorarioAsignatura') ? 'active' : ''}`} href='/privado/Funcionario/Registro/HorarioAsignatura'>
                          Registro horario de asignatura
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Registro/PeriodoExamen') ? 'active' : ''}`} href='/privado/Funcionario/Registro/PeriodoExamen'>
                          Registro periodo de examen
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Modificar/HorarioAsignatura') ? 'active' : ''}`} href='/privado/Funcionario/Modificar/HorarioAsignatura'>
                          Modificar horario de asignatura
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Modificar/HorarioExamen') ? 'active' : ''}`} href='/privado/Funcionario/Modificar/HorarioExamen'>
                          Modificar horario de examen
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Registro/AltaExamen') ? 'active' : ''}`} href='/privado/Funcionario/Registro/AltaExamen'>
                          Alta de examen
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/AltaDocente') ? 'active' : ''}`} href='/privado/Funcionario/AltaDocente'>
                          Alta docente
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Listar/Inscriptos') ? 'active' : ''}`} href='/privado/Funcionario/Listar/Inscriptos'>
                          Listar estudiantes inscriptos en asignatura
                        </a>
                        <a className={`nav-link ${isActive('/privado/Funcionario/Listar/Periodo') ? 'active' : ''}`} href='/privado/Funcionario/Listar/Periodo'>
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
                      className={`nav-link collapsed ${isAnyChildActive([
                        '/privado/Estudiantes/Carrera',
                        '/privado/Estudiantes/Asignatura',
                        '/privado/Estudiantes/Examen',
                        '/privado/Estudiantes/Asignatura/Pendiente',
                        '/privado/Estudiantes/Asignatura/Aprobada',
                        '/privado/Estudiantes/Escolaridad'
                      ]) ? 'active' : ''}`}
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
                      <nav className='sidenav-menu-nested nav accordion' id='accordionSidenavPages'>
                        <a className={`nav-link ${isActive('/privado/Estudiantes/Carrera') ? 'active' : ''}`} href='/privado/Estudiantes/Carrera'>
                          Inscripción a una carrera
                        </a>
                        <a className={`nav-link ${isActive('/privado/Estudiantes/Asignatura') ? 'active' : ''}`} href='/privado/Estudiantes/Asignatura'>
                          Inscripción a una asignatura
                        </a>
                        <a className={`nav-link ${isActive('/privado/Estudiantes/Examen') ? 'active' : ''}`} href='/privado/Estudiantes/Examen'>
                          Inscripción a un exámen
                        </a>
                        <a className={`nav-link ${isActive('/privado/Estudiantes/Asignatura/Pendiente') ? 'active' : ''}`} href='/privado/Estudiantes/Asignatura/Pendiente'>
                          Asignaturas pendientes
                        </a>
                        <a className={`nav-link ${isActive('/privado/Estudiantes/Asignatura/Aprobada') ? 'active' : ''}`} href='/privado/Estudiantes/Asignatura/Aprobada'>
                          Asignaturas aprobadas
                        </a>
                        <a className={`nav-link ${isActive('/privado/Estudiantes/Escolaridad') ? 'active' : ''}`} href='/privado/Estudiantes/Escolaridad'>
                          Generar Escolaridad
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
