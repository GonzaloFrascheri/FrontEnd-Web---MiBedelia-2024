"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faBook, faAngleDown } from '@fortawesome/free-solid-svg-icons';


export default function Sidebar() {

  const [currentPath, setCurrentPath] = useState('');

  const [collapseCursos, setCollapseCursos] = useState(false);
  const [collapseOtroElemento, setCollapseOtroElemento] = useState(false);

  const toggleCollapseCursos = () => {
    setCollapseCursos(!collapseCursos);
  };

  const toggleCollapseOtroElemento = () => {
    setCollapseOtroElemento(!collapseOtroElemento);
  };


  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
      <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
            <div className="sidenav-menu-heading">Principal</div>
            <a className="nav-link collapsed" 
              onClick={toggleCollapseCursos}
              aria-expanded={collapseCursos ? 'true' : 'false'}
              data-bs-toggle="collapse" data-bs-target="#collapsePrincipal" aria-controls="collapsePrincipal">
                <div className="nav-link-icon"><FontAwesomeIcon icon={faDashboard} /></div>
                Administrador
                <div className="sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
            </a>
            <div className={`collapse ${collapseCursos ? 'show' : ''}`} id="collapsePrincipal" data-bs-parent="#accordionSidenav">
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <a className="nav-link" href="/privado">Dashboard</a>
                </nav>
            </div>

            <div className="sidenav-menu-heading">Cursos</div>
            <a className="nav-link collapsed" 
                onClick={toggleCollapseOtroElemento}
                aria-expanded={collapseOtroElemento ? 'true' : 'false'}
                data-bs-toggle="collapse" data-bs-target="#collapseCursos" aria-controls="collapseCursos">
                <div className="nav-link-icon"><FontAwesomeIcon icon={faBook} /></div>
                Carreras
                <div className="sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
            </a>
            <div className={`collapse ${collapseOtroElemento ? 'show' : ''}`} id="collapseCursos" data-bs-parent="#accordionSidenav">
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                  <Link className="nav-link" href="/privado/materias/previas">Previas</Link>
                  <a className="nav-link" href="/privado/altacursos">Alta Cursos</a>
                  <a className="nav-link" href="/privado/listarCrusos">Listar Cursos</a>
                </nav>
            </div>
          </div>
        </div>
      </nav>
  );
}
