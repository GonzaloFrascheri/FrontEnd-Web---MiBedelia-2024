"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "@/utils/axios";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import ExamenAsignaturaListCarrera from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListCarrera";
import ExamenAsignaturaListAsignatura from "@/app/componentes/funcionario/registro/examen/examenAsignaturaListAsignatura";
import ExamenAsignaturaPasos from "@/app/componentes/funcionario/registro/examen/examenAsignaturaPasos";
import { isFormValid, parseDateToISO } from "@/utils/utils";
import { useSidebar } from "@/context/AppContext";
import { validators } from "@/utils/validators";

const useCarreras = () => {
  const [listaCarrera, setListaCarrera] = useState([]);
  const [selectedCarreraId, setSelectedCarreraId] = useState(null);

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

  return { listaCarrera, selectedCarreraId, setSelectedCarreraId };
};

const useAsignaturas = (selectedCarreraId) => {
  const [listaAsignatura, setListaAsignatura] = useState([]);

  useEffect(() => {
    const fetchListaAsignaturas = async () => {
      if (selectedCarreraId) {
        try {
          const response = await axios.get(
            `Funcionario/listarAsignatura?idCarrera=${selectedCarreraId}`
          );
          setListaAsignatura(response.data);
        } catch (error) {
          console.error("Error fetching listaAsignatura:", error);
        }
      }
    };
    fetchListaAsignaturas();
  }, [selectedCarreraId]);

  return { listaAsignatura };
};

const useDocentes = () => {
  const [listaDocentes, setListaDocentes] = useState([]);

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

  return { listaDocentes };
};

const usePeriodoActivo = (hoy, setFormData) => {
  const [periodoActivo, setPeriodoActivo] = useState({
    diaFin: "",
    diaInicio: "",
    idPeriodo: "",
  });

  useEffect(() => {
    const obtenerPeriodoActivo = async () => {
      try {
        const response = await axios.get(
          `Funcionario/getPeriodoActivo?Aniolectivo=${hoy.getFullYear()}`
        );
        const data = response.data;
        setPeriodoActivo({
          diaFin: data.diaFin,
          diaInicio: data.diaInicio,
          idPeriodo: data.idPeriodo,
        });
        setFormData((prevState) => ({
          ...prevState,
          idPeriodo: data.idPeriodo,
          fechaExamen: parseDateToISO(data.diaInicio),
        }));
      } catch (error) {
        console.error("Error fetching obtenerPeriodoActivo:", error);
      }
    };
    obtenerPeriodoActivo();
  }, [hoy, setFormData]);

  return { periodoActivo };
};

function FuncionarioExamenAsignatura() {
  const breadcrumbs = ["privado", "Funcionario", "Registro", "AltaExamen"];
  const hoy = useMemo(() => new Date(), []);
  const { isSidebarToggled } = useSidebar();

  const { listaCarrera, selectedCarreraId, setSelectedCarreraId } =
    useCarreras();
  const { listaAsignatura } = useAsignaturas(selectedCarreraId);
  const { listaDocentes } = useDocentes();

  const [formData, setFormData] = useState({
    idAsignatura: "",
    idPeriodo: "",
    idDocente: "",
    anioLectivo: hoy.getFullYear().toString(),
    fechaExamen: "",
    horario: "",
  });

  const [errors, setErrors] = useState({
    idAsignatura: "",
    idDocente: "",
    fechaExamen: "",
    horario: "",
  });

  const { periodoActivo } = usePeriodoActivo(hoy, setFormData);

  const [estado, setEstado] = useState({
    message: "",
    estado: "",
    continuar: false,
  });

  const handleCarreraChange = (id) => setSelectedCarreraId(id);

  const handleAsignaturaChange = (event) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      idAsignatura: value,
    }));
    handleErrors("idAsignatura", value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valueToChange =
      name === "fechaExamen" ? parseDateToISO(value) : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: valueToChange,
    }));

    handleErrors(name, valueToChange);
  };

  const handleErrors = (name, value) => {
    let error = "";
    if (name === "horario") {
      error = validators.validateRequired(value);
      if (!error) {
        error = validators.validateTime(value);
      }
    } else {
      error = validators.validateRequired(value);
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleValidation = () => {
    return isFormValid(errors, formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "Funcionario/registrarExamenAsignaturas",
        formData
      );

      if (status === 200) {
        setEstado({
          message: data.message,
          estado: data.estado,
          continuar: true,
        });
        setFormData({
          idAsignatura: "",
          idPeriodo: "",
          idDocente: "",
          anioLectivo: hoy.getFullYear().toString(),
          fechaExamen: "",
          horario: "",
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

  return (
    <body
      className={isSidebarToggled ? "nav-fixed" : "nav-fixed sidenav-toggled"}
    >
      <NavPrivado />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
              <main>
                <HeaderPagePrivado breadcrumbs={breadcrumbs} />
                <ExamenAsignaturaPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedAsignaturaId={formData.idAsignatura}
                />
                {selectedCarreraId === null ? (
                  <ExamenAsignaturaListCarrera
                    listaCarrera={listaCarrera}
                    onCarreraChange={handleCarreraChange}
                  />
                ) : (
                  <ExamenAsignaturaListAsignatura
                    errors={errors}
                    isFormValid={handleValidation}
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
