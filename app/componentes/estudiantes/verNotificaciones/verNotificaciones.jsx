import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import { useSidebar } from '@/context/AppContext'
import { useAuth } from '@/context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faKey } from '@fortawesome/free-solid-svg-icons'

export default function VerPerfil () {
  const authData = useAuth()
  const [user, setUser] = useState(null)
  const { isSidebarToggled, toggleSidebar } = useSidebar()
  useEffect(() => {
    if (authData && !user) {
      setUser(authData)
    }
    fetchNotifications();
  }, [authData, user])
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState)
  }

  // Estado para las notificaciones
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const { data, status } = await axios.get('Estudiante/AllNotificaciones');
      if (status === 200) {
        console.info('todas', data);
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

  return (
    <>
      <nav className='nav nav-borders'>
        <a className='nav-link ms-0' href='/privado/verperfil'>
          Perfil
        </a>
        <a className='nav-link active' href='#'>
          Notificaciones
        </a>
      </nav>
      <hr className='mt-0 mb-4' />
      <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          Notificaciones
        </div>
        <div class="list-group list-group-flush">
        <div class="col-lg-4">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar avatar-lg"><img class="avatar-img img-fluid" src="assets/img/illustrations/profiles/profile-1.png" /></div>
                                            <div class="ms-3">
                                                <div class="fs-4 text-dark fw-500">Tiger Nixon</div>
                                                <div class="small text-muted">Admin</div>
                                            </div>
                                        </div>
                                    </div>
          <ul>
            <li>
              {
              (notifications && notifications.length > 0) ? (
                notifications.map((notification, index) => (
                  <>
                  <div class="d-flex w-100 justify-content-between">
                    <FontAwesomeIcon icon={faBell} />
                  </div>
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Notificación {index+1} [{notification.id}]</h5>
                    <small>{formatearFecha(notification.fecha)}</small>
                  </div>
                  <p class="mb-1">{notification.texto} [leído: {notification.leido}]</p>
                  </>
                ))
              ) : (

                    <div className="dropdown-notifications-item-content-text">Sin Notificaciones nuevas.</div>

              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
