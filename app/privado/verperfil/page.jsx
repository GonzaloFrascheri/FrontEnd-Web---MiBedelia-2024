"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavPrivado from '../../componentes/navs/nav-privado.jsx';
import Sidebar from "../../componentes/siders/sidebar.jsx";
import VerPerfil from '../../componentes/perfil/verPerfil.jsx';
import { decodeJwt} from "jose";

function VerPerfilPage() {
  const router = useRouter();
  const token = sessionStorage.getItem("tokenFront");
  const [estado, setEstado] = useState({
    message: "",
    estado: 0
  });
  const [credentials, setCredentials] = useState({
    id: "",
    nombre: "",
    username: "",
    apellido: "",
    email: "",
    telefono: "",
    status: "",
    rol: "",
    uidgoogle: ""
  });
  const [data, setData] = useState('');
  useEffect(() => {
    const token = sessionStorage.getItem("tokenFront");
    if (!token) {
      router.push("/");
    } else {
      setData(decodeJwt (token));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetch('http://localhost:8080/usuario/getUsuario', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        mode: 'cors'
      })
        .then(res => {
          if (res.status !== 200) {
            throw new Error('Error en la conexión.');
          }
          setEstado({
            estado: res.status
          });
          return res.json();
        })
        .then(data => {
          setCredentials(data);
        })
        .catch(error => {
          console.error('Hubo un problema en el fecth:', error);
        });
    }
  }, []);

  return (
    <>
      <NavPrivado data={data} />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                  <div className="container-xl px-4">
                      <div className="page-header-content">
                          <div className="row align-items-center justify-content-between pt-3">
                              <div className="col-auto mb-3">
                                  <h1 className="page-header-title">
                                      <div className="page-header-icon"><i data-feather="user"></i></div>
                                      Configuracion de cuenta - Perfil
                                  </h1>
                              </div>
                          </div>
                      </div>
                  </div>
              </header>
              <div className="container-xl px-4 mt-4">
                <VerPerfil credentials={credentials} />
              </div>
          </main>
        </div>
      </div>
    </>
  );
}
  
export default VerPerfilPage;