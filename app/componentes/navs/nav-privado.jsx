"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

function NavPrivado({ data, isSidebarToggled, toggleSidebar }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    function dameNombre (data) {
        return data.sub;
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
            <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle" onClick={toggleSidebar}>
            <FontAwesomeIcon
                icon={faBars}
                className={isSidebarToggled ? 'rotate' : ''}
                style={{ transform: isSidebarToggled ? 'rotate(90deg)' : 'rotate(0deg)' }}
            />
            </button>
            <a className="navbar-brand pe-3 ps-4 ps-lg-2" href="/privado">
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
                        <img className="img-fluid" src="/img/illustrations/profiles/profile-2.png" />
                    </a>
                    <div className={`dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up ${dropdownOpen ? 'show' : ''}`} 
                        aria-labelledby="navbarDropdownUserImage">
                        <h6 className="dropdown-header d-flex align-items-center">
                            <img className="dropdown-user-img" src="/img/illustrations/profiles/profile-2.png" />
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">{dameNombre}</div>
                            </div>
                        </h6>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/privado/verperfil">
                            <div className="dropdown-item-icon"><FontAwesomeIcon icon={faUserAlt} /></div>
                            Ver perfil
                        </a>
                        <a className="dropdown-item" href="/privado/salir">
                            <div className="dropdown-item-icon"><FontAwesomeIcon icon={faSignOutAlt} /></div>
                            Salir
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}
export default NavPrivado;