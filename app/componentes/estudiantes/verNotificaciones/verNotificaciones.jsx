import React, { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import { useAuth } from '@/context/AuthProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell,faEye, faEyeSlash, faTrash, faKey } from '@fortawesome/free-solid-svg-icons'

export default function VerPerfil() {
  const authData = useAuth()
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (authData && !user) {
      setUser(authData)
    }
    fetchNotifications();
  }, [authData, user])

  // Estado para las notificaciones
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const { data, status } = await axios.get('Estudiante/AllNotificaciones');
      if (status === 200) {
        //console.info('Estudiante/AllNotificaciones', data);
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
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            Notificaciones
          </div>
          <div className="list-group list-group-flush">
            <ul className="ps-0 mb-0">
                {
                  (notifications && notifications.length > 0) ? (
                    notifications.map((notification, index) => (
                      <li key={notification.id} className="list-group-item">
                        <div className="d-flex align-items-center">
                          <div className={`avatar avatar-lg ${notification.leido ? 'avatar-busy' : 'avatar-online'}`}>
                            <FontAwesomeIcon icon={faBell} />
                          </div>
                          <div className="ms-3 w-100">
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-1">Notificación {index + 1}</h5>
                              <small>{formatearFecha(notification.fecha)}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                              <p className="mb-1">{notification.texto}</p>
                              <div className="dropdown-notifications-item-content-text">
                                {notification.leido  ? (
                                  <button
                                    data-bs-toggle="tooltip" data-bs-placement="left" title="Eliminar la notificación."
                                    className="btn btn-danger btn-sm"
                                    onClick={() => 
                                    {
                                      axios.put(`Estudiante/LeerNotificacion/${notification.id}`).then(() => {
                                        fetchNotifications();
                                      });
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                ) : (
                                  <button
                                    data-bs-toggle="tooltip" data-bs-placement="left" title="Marcar la notificación como leída."
                                    className="btn btn-success btn-sm"
                                    onClick={() => 
                                    {
                                      axios.put(`Estudiante/LeerNotificacion/${notification.id}`).then(() => {
                                        fetchNotifications();
                                      });
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">
                        <div className="d-flex align-items-center">
                          <div className="dropdown-notifications-item-content-text">Sin Notificaciones nuevas.</div>
                        </div>
                    </li>
                  )}
            </ul>
          </div>
          <div className='card-footer'></div>
        </div>
      </div>
    </>
  )
}
