"use client";

import React, { useEffect, useState } from "react";
import NavPrivado from "@/app/componentes/navs/nav-privado";
import Sidebar from "@/app/componentes/siders/sidebar";
import InscripcionExamen from "@/app/componentes/estudiantes/examen/inscripcionExamen";
import { usePathname, useRouter } from "next/navigation";
import HeaderPagePrivado from "@/app/componentes/headers/headerPage-privado";
import { userAuthenticationCheck } from "@/utils/auth";
import axios from "@/utils/axios";
function EstudianteInscripcionExamen() {
  const router = useRouter();
  const pathname = usePathname();
  const breadcrumbs = ["privado", "Estudiantes", "Exámen"];
  const [userData, setUserData] = useState(null);
  const [estado, setEstado] = useState({
    message: "",
    estado: "",
  });
  const [selectedExam, setSelectedExam] = useState("");
  const [exams, setExams] = useState([]);
  const [examsAreLoading, setExamsAreLoading] = useState(true);

  //   useEffect(() => {
  //     const userData = userAuthenticationCheck(router, pathname);
  //     setUserData(userData);

  //     const fetchExams = async () => {
  //       try {
  //         const response = await axios.get("/Funcionario/listarCarrera");
  //         const { status, data } = response;
  //         if (status === 200) {
  //           setExams([...data]);
  //           setExamsAreLoading(false);
  //         }
  //       } catch (error) {
  //         const { status, data } = error.response;
  //         setEstado({
  //           estado: status,
  //           message: data.message,
  //         });
  //       }
  //     };
  //     fetchExams();
  //   }, [router, pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make request
  };

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const onExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

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
                <InscripcionExamen
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
