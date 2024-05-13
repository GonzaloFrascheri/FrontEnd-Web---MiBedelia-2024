"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function NavPublico() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };
    return (
        <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white">

            <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><i data-feather="menu"></i></button>

            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <a className="navbar-brand pe-3 ps-4 ps-lg-2" 
                    href="./">
                    <img
                        alt="logo.png"
                        src="../../img/logo.png"
                        width={50}
                        className="h-auto align-middle border-none absolute -m-5 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                </a>

                <ul className="navbar-nav align-items-center ms-auto">
                    <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" 
                            id="navbarDropdownUserImage" 
                            onClick={toggleDropdown}
                            role="button" 
                            data-bs-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                            <img className="img-fluid" src="img/illustrations/profiles/profile-0.png" />
                        </a>
                        <div 
                            className={`dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up ${dropdownOpen ? 'show' : ''}`}  
                            aria-labelledby="navbarDropdownUserImage">
                            <h6 className="dropdown-header d-flex align-items-center">
                                <img className="dropdown-user-img" src="img/illustrations/profiles/profile-0.png" />
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name">No iniciado</div>
                                </div>
                            </h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/registrar">
                                <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                                Registrar Usuarios
                            </a>
                            <a className="dropdown-item" href="/login">
                                <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                                Iniciar Sesión
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavPublico;
