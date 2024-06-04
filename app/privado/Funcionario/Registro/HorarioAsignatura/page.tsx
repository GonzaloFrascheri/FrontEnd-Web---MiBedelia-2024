"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Sidebar from "@/app/componentes/siders/sidebar";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import HorarioAsignaturaListCarrera from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaListCarrera";
import HorarioAsignaturaListAsignatura from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaListAsignatura";
import HorarioAsignaturaPasos from "@/app/componentes/funcionario/registro/horario/horarioAsignaturaPasos";
import validators from "@/utils/validators";
import { compararHoras, isFormValid } from "@/utils/utils";
import { useSidebar } from "@/context/AppContext";

function FuncionarioExamenAsignatura() {
  const breadcrumbs = [
    "privado",
    "Funcionario",
    "Registro",
    "HorarioAsignatura",
  ];

  // State variables
  const [listaCarrera, setListaCarrera] = useState([]);
  const [listaAsignatura, setListaAsignatura] = useState([]);
  const [listaDocentes, setListaDocentes] = useState([]);
  const [selectedCarreraId, setSelectedCarreraId] = useState(null);
  const [selectedAsignaturaId, setSelectedAsignaturaId] = useState(null);
  const [formData, setFormData] = useState({
    idAsignatura: "",
    ciDocente: "",
    horarioInicio: "",
    horarioFin: "",
    diasDictados: [],
  });
  const [estado, setEstado] = useState({
    message: "",
    estado: "",
  });
  const [errors, setErrors] = useState({
    idAsignatura: "",
    ciDocente: "",
    horarioInicio: "",
    horarioFin: "",
    diasDictados: "",
  });
  const { isSidebarToggled } = useSidebar();

  const handleValidation = () => {
    return isFormValid(errors, formData);
  };

  const handleErrors = (name, value) => {
    let error = "";
    if (["horarioInicio", "horarioFin"].includes(name)) {
      error = validators.validateRequired(value);
      if (!error) {
        error = validators.validateTime(value);
      }
    } else if (name === "diasDictados") {
      error = validators.validateClassDays(value);
    } else {
      error = validators.validateRequired(value);
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const fetchListaCarreras = async () => {
    try {
      const response = await axios.get("Funcionario/listarCarrera");
      setListaCarrera(response.data);
    } catch (error) {
      console.error("Error fetching listaCarreras:", error);
    }
  };

  const fetchListaAsignaturas = async (carreraId) => {
    try {
      const response = await axios.get(
        `Funcionario/listarAsignaturaPaginado?idCarrera=${carreraId}&page=1&pageSize=300`
      );
      setListaAsignatura(response.data.items);
    } catch (error) {
      console.error("Error fetching listaAsignatura:", error);
    }
  };

  const fetchListaDocentes = async () => {
    try {
      const response = await axios.get("Funcionario/listarDocentes");
      setListaDocentes(response.data);
    } catch (error) {
      console.error("Error fetching listaDocentes:", error);
    }
  };

  // UseEffect hooks
  useEffect(() => {
    fetchListaCarreras();
    fetchListaDocentes();
  }, []);

  useEffect(() => {
    if (selectedCarreraId !== null) {
      fetchListaAsignaturas(selectedCarreraId);
    }
  }, [selectedCarreraId]);

  // Handlers
  const handleCarreraChange = (id) => {
    setSelectedCarreraId(id);
    setFormData({
      idAsignatura: "",
      ciDocente: "",
      horarioInicio: "",
      horarioFin: "",
      diasDictados: [],
    });
  };

  const handleAsignaturaChange = (event) => {
    const selectedId = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      idAsignatura: selectedId,
    }));
    setSelectedAsignaturaId(selectedId);
    handleErrors("idAsignatura", selectedId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "diasDictados") {
      setFormData((prevState) => ({
        ...prevState,
        diasDictados: [...prevState.diasDictados, value],
      }));
    } else
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    const errorToEvaluate =
      name === "diasDictados" ? [...formData.diasDictados, value] : value;

    handleErrors(name, errorToEvaluate);
  };

  const handleRemoveDay = (dayToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      diasDictados: prevState.diasDictados.filter((day) => day !== dayToRemove),
    }));
    handleErrors("diasDictados", [
      ...formData.diasDictados.filter((day) => day !== dayToRemove),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chequeo que la hora de final sea mayor a la de inicio
    if (!compararHoras(formData.horarioFin, formData.horarioInicio)) {
      setErrors((prevState) => ({
        ...prevState,
        horarioFin: "El horario de fin debe ser mayor que el de inicio",
      }));
      return;
    }

    if (!handleValidation()) return;

    try {
      const { data, status } = await axios.post(
        "Funcionario/registroHorarioAsignatura",
        formData
      );
      setEstado({
        message: data.message,
        estado: status === 200 ? data.estado : data.status,
      });
      // Limpia el formulario después de enviar los datos
      setFormData({
        idAsignatura: "",
        ciDocente: "",
        horarioInicio: "",
        horarioFin: "",
        diasDictados: [],
      });
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : "Error al registrar el horario",
        estado: error.response ? error.response.status : 500,
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
                <HorarioAsignaturaPasos
                  selectedCarreraId={selectedCarreraId}
                  selectedAsignaturaId={selectedAsignaturaId}
                />
                {selectedCarreraId === null ? (
                  <HorarioAsignaturaListCarrera
                    listaCarrera={listaCarrera}
                    onCarreraChange={handleCarreraChange}
                  />
                ) : (
                  <HorarioAsignaturaListAsignatura
                    listaAsignaturas={listaAsignatura}
                    handleAsignaturaChange={handleAsignaturaChange}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    estado={estado}
                    listaDocentes={listaDocentes}
                    formData={formData}
                    errors={errors}
                    isFormValid={handleValidation}
                    handleRemoveDay={handleRemoveDay}
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
