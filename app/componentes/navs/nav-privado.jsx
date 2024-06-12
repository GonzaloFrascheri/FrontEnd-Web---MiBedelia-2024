'use client'
import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import { useSidebar } from '@/context/AppContext'
import { useAuth } from '@/context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faUserAlt,
  faSignOutAlt,
  faBell,
  faBook,
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons'

function NavPrivado () {
  const authData = useAuth()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isSidebarToggled, toggleSidebar } = useSidebar()
  
  // Estado para las notificaciones
  const [notifications, setNotifications] = useState([]);
  const [cantSinLeer, setCantSinLeer] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null); // Notificación seleccionada
  const [modalOpen, setModalOpen] = useState(false); // Control del modal

  useEffect(() => {
    if (authData && !user) {
      setUser(authData)
    }
    fetchNotifications();
  }, [authData, user])

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState)
  }

  /** NOTIFICACIONES */
  const fetchNotifications = async () => {
    try {
      const { data, status } = await axios.get('Estudiante/NewNotificaciones');
      if (status === 200) {
        console.log(data);
        setNotifications(data);
        setCantSinLeer(data.length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Función para abrir el modal y seleccionar la notificación
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedNotification(null);
  };

  // Función para marcar la notificación como leída
  const markAsRead = async (id) => {
    try {
      await axios.put(`Estudiante/notificacionLeida?idNotificacion=${id}`);
      setNotifications(notifications.filter(notif => notif.id !== id));
      setCantSinLeer(cantSinLeer - 1);
      closeModal();
    } catch (error) {
      console.error('Error al marcar como leida la notificacion:', error);
    }
  };

  return (
    <>
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
            <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <FontAwesomeIcon icon={faBell} />
              {cantSinLeer === 0 ? (
                <span className="badge badgeRightBottom bg-success text-white">0</span>
              ) : (
                <span className="badge badgeRightBottom bg-red text-white">{cantSinLeer}</span>
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
              <h6 className="dropdown-header dropdown-notifications-header">
                <FontAwesomeIcon icon={faBell} />
                Notificaciones
              </h6>
              {/* Estudiante */}
              {(user && user.role === 'ESTUDIANTE') ? (
                (notifications && notifications.length > 0) ? (
                  notifications.map((notification, index) => (
                    <a
                      key={index}
                      className="dropdown-item dropdown-notifications-item"
                      href="#!"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="dropdown-notifications-item-icon bg-warning"><FontAwesomeIcon icon={faBook} /></div>
                      <div className="dropdown-notifications-item-content">
                        <div className="dropdown-notifications-item-content-details">{formatearFecha(notification.fecha)}</div>
                        <div className="dropdown-notifications-item-content-text">{notification.texto}</div>
                      </div>
                    </a>
                  ))
                ) : (
                  <a className="dropdown-item dropdown-notifications-item" href="#!">
                    <div className="dropdown-notifications-item-icon bg-success"><FontAwesomeIcon icon={faCheckDouble} /></div>
                    <div className="dropdown-notifications-item-content">
                      <div className="dropdown-notifications-item-content-text">Sin Notificaciones nuevas.</div>
                    </div>
                  </a>
                )
              ) : (
                <a className="dropdown-item dropdown-notifications-item" href="#!">
                  <div className="dropdown-notifications-item-icon bg-success"><FontAwesomeIcon icon={faCheckDouble} /></div>
                  <div className="dropdown-notifications-item-content">
                    <div className="dropdown-notifications-item-content-text">Sin Notificaciones nuevas.</div>
                  </div>
                </a>
              )}
              <a className="dropdown-item dropdown-notifications-footer" href="/privado/Estudiantes/VerNotificaciones">Ver todas las notificaciones</a>
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

      {/* Modal */}
      {modalOpen && selectedNotification && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notificación</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>{selectedNotification.texto}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={() => markAsRead(selectedNotification.id)}>Marcar como leído</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NavPrivado
