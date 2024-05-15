"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegistrarGoogle from "../componentes/main/registrarGoogle.jsx";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

function LoginPage() {
  const router = useRouter();

  // constantes para el login
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    google: ""
  });
  
  const [userData, setUserData] = useState({
    nombre: "",
    username: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "usuarioGoogle",
    img: "",
    token: "",
    uidgoogle: ""
  });

  const [error, setError] = useState('El nombre de usuario debe tener 8 dígitos.');
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,8}$/.test(value)) {
      setCredentials({ ...credentials, username: value });
      if (value.length === 8) {
        setError('');
      } else {
        setError('El nombre de usuario debe tener 8 dígitos.');
      }
    }
  };

  const [errorP, setErrorP] = useState('La contraseña debe tener al menos 4 caracteres.');
  const handlePaswordChange = (e) => {
    const value = e.target.value;
    if (value.length >= 4) {
      setCredentials({ ...credentials, password: value });
      setErrorP('');
    } else {
      setErrorP('La contraseña debe tener al menos 4 caracteres.');
    }
  }

  // enviar formulario de login
  const handleSubmit = async (e) => {
    //console.log(credentials);
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (res.status !== 200) {
        if (res.status === 401) 
          throw new Error('Credenciales incorrectas.');
        else
          throw new Error('Error en la conexión.');
      }
      return res.json();
    })
    .then(data => {
      sessionStorage.setItem('tokenFront', data.token);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      router.push("/privado");
    })
    .catch(error => {
      if (error.message === 'Credenciales incorrectas.') {
        alert('Credenciales incorrectas.');
        document.getElementById("login").reset();
      } else
        console.error('There was a problem with the fetch operation:', error);
    });

  };

  return (
    <>
      {credentials.google === "google" ? (
        <RegistrarGoogle userdata={userData} />
      ) : (
        <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div className="container-xl px-4">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                            <div className="card my-5">
                                <div className="card-body p-5 text-center">
                                    <div className="h3 fw-light mb-3">Iniciar Sesion</div>
                                </div>
                                <hr className="my-0" />
                                <div className="card-body p-5">
                                    <form id="login" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="text-gray-600 small">Nombre de usuario</label>
                                            <input
                                              className="form-control form-control-solid"
                                              type="text"
                                              placeholder="Username"
                                              maxLength="8"
                                              value={credentials.username}
                                              onChange={handleUsernameChange}
                                            />
                                            {error && <div className="text-danger small mt-2">{error}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" >Contraseña</label>
                                            <input className="form-control form-control-solid"
                                                type="password"
                                                placeholder="Password"
                                                onChange={handlePaswordChange}
                                            />
                                            {errorP && <div className="text-danger small mt-2">{errorP}</div>}
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-0">
                                            <div className="form-check">
                                                <input className="form-check-input" id="checkRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label">Recuerdame</label>
                                            </div>
                                            <button className="btn btn-primary" type="submit" disabled={!!error || !!errorP}>Iniciar</button>
                                        </div>
                                    </form>
                                </div>
                                <hr className="my-0" />
                                <div className="card-body px-5 py-4">
                                    <div className="small text-center">
                                        ¿Eres nuevo aquí?
                                        <a href="./registrar">Regístrate!</a>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="small"><a href="./">Volver al inicio</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
      )}
    </>
  );
}

export default LoginPage;