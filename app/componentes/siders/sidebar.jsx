"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faBook, faAngleDown, faUserTie, faArrowsToCircle, faPenFancy, faGraduationCap} from '@fortawesome/free-solid-svg-icons';


export default function Sidebar({ isSidebarToggled }) {

  const [currentPath, setCurrentPath] = useState('');

  const [collapseAdministrador, setCollapseAdministrador] = useState(false);
  const [collapseCoordinador, setCollapseCoordinador] = useState(false);
  const [collapseFuncionario, setCollapseFuncionario] = useState(false);
  const [collapseEstudiante, setCollapseEstudiante] = useState(false);

  const [collapseOtroElemento, setCollapseOtroElemento] = useState(false);

  const toggleCollapseAdministrador = () => {
    setCollapseAdministrador(!collapseAdministrador);
  };

  const toggleCollapseCoordinador = () => {
    setCollapseCoordinador(!collapseCoordinador);
  };

  const toggleCollapseFuncionario = () => {
    setCollapseFuncionario(!collapseFuncionario);
  };

  const toggleCollapseEstudiante = () => {
    setCollapseEstudiante(!collapseEstudiante);
  };

  const toggleCollapseOtroElemento = () => {
    setCollapseOtroElemento(!collapseOtroElemento);
  };


  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    isSidebarToggled && (
      <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
            <div className="sidenav-menu-heading">Principal</div>

            {/* Administrador */}
            <a className="nav-link collapsed" 
              onClick={toggleCollapseAdministrador}
              aria-expanded={collapseAdministrador ? 'true' : 'false'}
              data-bs-toggle="collapse" data-bs-target="#collapseAdministrador" aria-controls="collapseAdministrador">
                <div className="nav-link-icon"><FontAwesomeIcon icon={faUserTie} /></div>
                Administrador
                <div className="sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
            </a>
            <div className={`collapse ${collapseAdministrador ? 'show' : ''}`} id="collapseAdministrador" data-bs-parent="#accordionSidenav">
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <a className="nav-link" href="/privado/Usuarios/Alta">Alta de Usuario</a>
                    <a className="nav-link" href="/privado/Usuarios/Baja/">Baja de Usuario</a>
                    <a className="nav-link" href="/privado/Usuarios/Listar">Listar Usuarios</a>
                </nav>
            </div>

            {/** Coordinador */} 
            <a className="nav-link collapsed" 
              onClick={toggleCollapseCoordinador}
              aria-expanded={collapseCoordinador ? 'true' : 'false'}
              data-bs-toggle="collapse" data-bs-target="#collapseCoordinador" aria-controls="collapseCoordinador">
                <div className="nav-link-icon"><FontAwesomeIcon icon={faArrowsToCircle} /></div>
                Coordinador
                <div className="sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
            </a>
            <div className={`collapse ${collapseCoordinador ? 'show' : ''}`} id="collapseCoordinador" data-bs-parent="#accordionSidenav">
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <a className="nav-link" href="/privado/Coordinador/Carrera">Alta Carrera</a>
                    <a className="nav-link" href="/privado/Coordinador/Asignatura">Alta Asignatura</a>
                </nav>
            </div>

            {/** Funcionario */}
            <a className="nav-link collapsed" 
              onClick={toggleCollapseFuncionario}
              aria-expanded={collapseFuncionario ? 'true' : 'false'}
              data-bs-toggle="collapse" data-bs-target="#collapseFuncionario" aria-controls="collapseFuncionario">
                <div className="nav-link-icon"><FontAwesomeIcon icon={faPenFancy} /></div>
                Funcionario
                <div className="sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
            </a>
            <div className={`collapse ${collapseFuncionario ? 'show' : ''}`} id="collapseFuncionario" data-bs-parent="#accordionSidenav">
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <a className="nav-link" href="/privado">Generar acta fin de curso</a>
                    <a className="nav-link" href="/privado">Generar acta examen</a>
                    <a className="nav-link" href="/privado">Registro de horario a asignatura</a>
                    <a className="nav-link" href="/privado">Registro periodo de examen</a>
                    <a className="nav-link" href="/privado">Registro examen relacionado asignatura dada</a>
                    <a className="nav-link" href="/privado">Alta docente</a>
                </nav>
            </div>

            {/* Estudiante */}
            <a className="nav-link collapsed" 
              onClick={toggleCollapseEstudiante}
              aria-expanded={collapseEstudiante ? 'true' : 'false'}
              data-bs-toggle="collapse" data-bs-target="#collapseEstudiante" aria-controls="collapseEstudiante">
                <div className="nav-link-icon"><FontAwesomeIcon icon={faGraduationCap} /></div>
                Estudiante
                <div className="sidenav-collapse-arrow"><FontAwesomeIcon icon={faAngleDown} /></div>
            </a>
            <div className={`collapse ${collapseEstudiante ? 'show' : ''}`} id="collapseEstudiante" data-bs-parent="#accordionSidenav">
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                    <a className="nav-link" href="/privado">Inscripción a una carrera</a>
                    <a className="nav-link" href="/privado">Inscripción a una asignatura</a>
                    <a className="nav-link" href="/privado">Inscripción a un examen</a>
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
    )
  );
}
