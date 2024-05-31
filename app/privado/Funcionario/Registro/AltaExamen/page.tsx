"use client";
import React, { use, useEffect, useState } from "react";
import axios from "@/utils/axios";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import ExamenAsignaturaListCarrera from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListCarrera";
import ExamenAsignaturaListAsignatura from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListAsignatura";
import ExamenAsignaturaPasos from "@/app/componentes/funcionario/registro/examen/examenAsignaturaPasos";
import { parseDateToISO } from "@/utils/utils";

function FuncionarioExamenAsignatura() {
  const breadcrumbs = [
    "privado",
    "Funcionario",
    "Registro",
    "AltaExamen",
  ];
  const [listaCarrera, setListaCarrera] = useState([]);
  const [listaAsignatura, setListaAsignatura] = useState([]);
  const [listaDocentes, setListaDocentes] = useState([]);
  const [selectedCarreraId, setSelectedCarreraId] = useState(null);
  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);
  const hoy = new Date();
  const [estado, setEstado] = useState({
    message: "",
    estado: "",
    continuar: false,
  });
  const [periodoActivo, setPeriodoActivo] = useState({
    diaFin: "",
    diaInicio: "",
    idPeriodo: "",
  });
  const [formData, setFormData] = useState({
    idAsignatura: "",
    idPeriodo: "",
    idDocente: "",
    anioLectivo: hoy.getFullYear().toString(),
    fechaExamen: "",
  });

  const handleCarreraChange = (id) => {
    setSelectedCarreraId(id);
  };

  const handleAsignaturaChange = (event) => {
    const selectedId = event.target.value;
    setFormData({
      ...formData,
      idAsignatura: selectedId,
    });
    setSelectedAsignaturaId(selectedId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedDate = parseDateToISO(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedDate,
    }));
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info("formData", formData);
    try {
      // envío datos al bk
      const { data, status } = await axios.post(
        "Funcionario/registrarExamenAsignaturas",
        formData
      );
      // si la data es ok - examen fue dado de alta
      if (status === 200) {
        setEstado({
          message: data.message,
          estado: data.estado,
          continuar: true,
        });
        // Limpia el formulario después de enviar los datos
        setFormData({
          idAsignatura: "",
          idPeriodo: "",
          idDocente: "",
          anioLectivo: "",
          fechaExamen: "",
        });
      } else {
        setEstado({
          message: data.message,
          estado: data.status,
          continuar: false,
        });
      }
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : "Error al guardar el examen. Intente nuevamente.",
        estado: error.response ? error.response.status : 500,
        continuar: false,
      });
    }
  };

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  useEffect(() => {
    const fetchListaCarreras = async () => {
      try {
        const response = await axios.get("Funcionario/listarCarrera");
        setListaCarrera(response.data);
      } catch (error) {
        console.error("Error fetching listaCarreras:", error);
      }
    };

    fetchListaCarreras();
  }, []);

  useEffect(() => {
    const fetchListaDocentes = async () => {
      try {
        const response = await axios.get("Funcionario/listarDocentes");
        setListaDocentes(response.data);
      } catch (error) {
        console.error("Error fetching listaDocentes:", error);
      }
    };
    fetchListaDocentes();
  }, []);

  useEffect(() => {
    const fetchListaAsignaturas = async () => {
      try {
        const response = await axios.get(
          "Funcionario/listarAsignatura?idCarrera=" + selectedCarreraId
        );
        setListaAsignatura(response.data);
      } catch (error) {
        console.error("Error fetching listaAsignatura:", error);
      }
    };
    fetchListaAsignaturas();
  }, [selectedCarreraId]);

  useEffect(() => {
    const obtenerPeriodoActivo = async () => {
      try {
        const response = await axios.get(
          "Funcionario/getPeriodoActivo?Aniolectivo=" + hoy.getFullYear()
        );
        setPeriodoActivo({
          diaFin: response.data.diaFin,
          diaInicio: response.data.diaInicio,
          idPeriodo: response.data.idPeriodo,
        });
        setFormData({
          ...formData,
          idPeriodo: response.data.idPeriodo,
          fechaExamen: parseDateToISO(response.data.diaInicio),
        });
      } catch (error) {
        console.error("Error fetching obtenerPeriodoActivo:", error);
      }
    };
    obtenerPeriodoActivo();
  }, []);

  return (
    <body
      className={isSidebarToggled ? "nav-fixed" : "nav-fixed sidenav-toggled"}
    >
      <NavPrivado
        isSidebarToggled={isSidebarToggled}
        toggleSidebar={toggleSidebar}
      />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar isSidebarToggled={isSidebarToggled} />
        </div>
        <div id="layoutSidenav_content">
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <HeaderPagePrivado breadcrumbs={breadcrumbs} />
                <ExamenAsignaturaPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedAsignaturaId={selectedAsignaturaId}
                />
                {selectedCarreraId === null ? (
                  <ExamenAsignaturaListCarrera
                    listaCarrera={listaCarrera}
                    onCarreraChange={handleCarreraChange}
                  />
                ) : (
                  <ExamenAsignaturaListAsignatura
                    isFormValid={isFormValid}
                    listaAsignaturas={listaAsignatura}
                    handleAsignaturaChange={handleAsignaturaChange}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    periodoActivo={periodoActivo}
                    listaDocentes={listaDocentes}
                    formData={formData}
                    estado={estado}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default FuncionarioExamenAsignatura;
