"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegistrarGoogle from "../componentes/main/registrarGoogle.jsx";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

function LoginPage() {
  const router = useRouter();
  // constantes apra login
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

  const firebaseConfig = {
    apiKey: "AIzaSyDljci4JPTaLFqO40GiqaIUIzZfZZWUr9c",
    authDomain: "prototipo1-1e6c8.firebaseapp.com",
    projectId: "prototipo1-1e6c8",
    storageBucket: "prototipo1-1e6c8.appspot.com",
    messagingSenderId: "859805179851",
    appId: "1:859805179851:web:1b3f384c7f289a4de7604e",
    measurementId: "G-DX5HY70DDV"
  }
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  // login por google
  function call_login_google() {
    signInWithPopup(auth, provider)
    .then((result) => {

      setCredentials({ ...credentials, google: "google" });

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
  
      setUserData({ ...userData
        , nombre: user.displayName
        , email: user.email
        , telefono: user.phoneNumber
        , img: user.photoURL
        , uidgoogle: user.uid
        , token: user.accessToken
      });
      
      // enviar token de google al backend

      res = fetch('http://localhost:8080/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: user.accessToken
      }).then(res => {
        if (res.status !== 200) {
          if (res.status === 401) 
            throw new Error('Credenciales incorrectas.');
          else
            throw new Error('Error en la conexión.');
        }
        return res.json();
      }).then(data => {
        //console.log(data.evento, data.token);
        if (data.evento === 'success') {
          if (data.token === null){
            // No esta Registrado
            // alert('No estas registrado en la aplicación. Por favor registrate.');
            
            // router.push("/registrarGoogle", { userData: userData });
          }else{
            // Esta Registrado

            alert('Bienvenido ' + data.nombre + ' ' + data.apellido + ' a la aplicación.')
            //router.push("/privado");
          }
        }
        //router.push("/privado");
      }).catch(error => {
        alert(error.message, error.evento);
      });
        
      
       /**
       * creo una ruta privada para el usuario
       * y le paso los datos del usuario
       */
     // router.push("/privado", { userData: userData });
      
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  // enviar formulario de login
  const handleSubmit = async (e) => {
    console.log(credentials);
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
                                    <a className="btn btn-icon mx-1" href="#!">
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src="img/github.svg"
                                        />
                                    </a>
                                    <button className="btn btn-icon mx-1" onClick={call_login_google} >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src="img/google.svg"
                                        />
                                    </button>

                                </div>
                                <hr className="my-0" />
                                <div className="card-body p-5">
                                    <form id="login" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="text-gray-600 small">Nombre de usuario</label>
                                            <input className="form-control form-control-solid" 
                                                type="username"
                                                placeholder="Username"
                                                onChange={(e) =>
                                                    setCredentials({
                                                    ...credentials,
                                                    username: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" >Contraseña</label>
                                            <input className="form-control form-control-solid"
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) =>
                                                    setCredentials({
                                                    ...credentials,
                                                    password: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-0">
                                            <div className="form-check">
                                                <input className="form-check-input" id="checkRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label">Recuerdame</label>
                                            </div>
                                            <button className="btn btn-primary" type="submit">Iniciar</button>
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