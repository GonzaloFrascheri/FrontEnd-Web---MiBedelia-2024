'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faUserAlt,
  faSignOutAlt,
  faBell,
  faBook
} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { useSidebar } from '@/context/AppContext'

function NavPrivado () {
  const authData = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const { isSidebarToggled, toggleSidebar } = useSidebar()

  useEffect(() => {
    if (authData && !user) {
      setUser(authData)
    }
  }, [authData, user])

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState)
  }

  return (
    <nav
      className='topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white'
      id='sidenavAccordion'
    >
      <button
        className='btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0'
        id='sidebarToggle'
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={isSidebarToggled ? 'rotate' : ''}
          style={{
            transform: isSidebarToggled ? 'rotate(90deg)' : 'rotate(0deg)'
          }}
        />
      </button>
      <a className='navbar-brand pe-3 ps-4 ps-lg-2' href='/privado'>
        <img
          alt='logo.png'
          src='/img/logo.png'
          width={50}
          className='h-auto align-middle border-none absolute -m-5 -ml-20 lg:-ml-16 max-w-150-px'
        />
      </a>
      <ul className='navbar-nav align-items-center ms-auto'>
        <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
            <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon={faBell} /></a>
            <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                <h6 className="dropdown-header dropdown-notifications-header">
                    <FontAwesomeIcon icon={faBell} />
                    Notificaciones
                </h6>
                
                <a className="dropdown-item dropdown-notifications-item" href="#!">
                    <div className="dropdown-notifications-item-icon bg-warning"><FontAwesomeIcon icon={faBook} /></div>
                    <div className="dropdown-notifications-item-content">
                        <div className="dropdown-notifications-item-content-details">2024-06-01</div>
                        <div className="dropdown-notifications-item-content-text">Notificación de prueba.</div>
                    </div>
                </a>
                
                <a className="dropdown-item dropdown-notifications-footer" href="#!">Ver todas las notificaciones</a>
            </div>
        </li>
        <li className='nav-item dropdown no-caret dropdown-user me-3 me-lg-4'>
          <a
            className='btn btn-icon btn-transparent-dark dropdown-toggle'
            id='navbarDropdownUserImage'
            onClick={toggleDropdown}
            role='button'
            data-bs-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <img
              alt='Profile picture'
              className='img-fluid'
              src='/img/illustrations/profiles/profile-2.png'
            />
          </a>
          <div
            className={`dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up ${
              dropdownOpen ? 'show' : ''
            }`}
            aria-labelledby='navbarDropdownUserImage'
          >
            <h6 className='dropdown-header d-flex align-items-center'>
              <img
                alt='Profile picture'
                className='dropdown-user-img'
                src='/img/illustrations/profiles/profile-2.png'
              />
              <div className='dropdown-user-details'>
                <div className='dropdown-user-details-name'>
                  {user ? user.name : ''}
                </div>
              </div>
            </h6>
            <div className='dropdown-divider'></div>
            <a className='dropdown-item' href='/privado/verperfil'>
              <div className='dropdown-item-icon'>
                <FontAwesomeIcon icon={faUserAlt} />
              </div>
              Ver perfil
            </a>
            <a className='dropdown-item' href='/privado/salir'>
              <div className='dropdown-item-icon'>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </div>
              Salir
            </a>
          </div>
        </li>
      </ul>
    </nav>
  )
}
export default NavPrivado
