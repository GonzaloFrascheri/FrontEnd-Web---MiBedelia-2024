"use client";
import React, { useEffect, useState } from "react";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import Sidebar from "@/app/componentes/siders/sidebar";
import InscripcionExamen from "@/app/componentes/estudiantes/examen/inscripcionExamen";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import axios from "@/utils/axios";
import { useAuth } from "@/context/AuthProvider";
import { useSidebar } from "@/context/AppContext";

function EstudianteInscripcionExamen() {
  const authData = useAuth();
  const breadcrumbs = ["privado", "Estudiantes", "Examen"];
  const [userData, setUserData] = useState(null);
  const [estado, setEstado] = useState({
    message: "",
    estado: "",
  });
  const [selectedExam, setSelectedExam] = useState("");
  const [exams, setExams] = useState([]);
  const [examsAreLoading, setExamsAreLoading] = useState(true);
  const { isSidebarToggled } = useSidebar();

  useEffect(() => {
    if (authData && !userData) {
      setUserData(authData);
    }
  }, [authData, userData]);

  useEffect(() => {
    if (userData) {
      const fetchExams = async () => {
        try {
          const response = await axios.get(
            `/Estudiante/listarExamenesDisponibles?estudianteId=${userData.id}`
          );
          const { status, data } = response;
          if (status === 200) {
            setExams([...data]);
            setExamsAreLoading(false);
          }
        } catch (error) {
          const { status, data } = error.response;
          setEstado({
            estado: status,
            message: data.message || "Error al cargar los exámenes",
          });
        }
      };
      fetchExams();
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `/Estudiante/inscripcionExamen?examenId=${selectedExam}&estudianteId=${userData.id}`
      );
      const { status, data } = response;

      setEstado({
        message: data.message,
        estado: status.toString(10),
      });
    } catch (error) {
      setEstado({
        message: error.response
          ? error.response.data.message
          : "Error al inscribirse al examen",
        estado: error.response ? error.response.status : 500,
      });
    }
  };

  const onExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  // If failed, reset form status
  const resetFormStatus = () => {
    setEstado({
      message: "",
      estado: "",
    });
    setSelectedExam("");
    setExams((prevState) => [...prevState]);
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
                <InscripcionExamen
                  resetearForm={resetFormStatus}
                  examenSeleccionado={selectedExam}
                  estanCargandoExamenes={examsAreLoading}
                  examenes={exams}
                  estado={estado}
                  seleccionarExamen={onExamChange}
                  handleSubmit={handleSubmit}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default EstudianteInscripcionExamen;
