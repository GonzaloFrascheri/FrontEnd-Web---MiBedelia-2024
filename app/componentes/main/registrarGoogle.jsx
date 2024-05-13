"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faBell, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


export default function RegistrarGoogle({ userdata }) {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    nombre: userdata.nombre,
    apellido: "",
    username: "",
    email: userdata.email,
    password: "",
    telefono: "",
    // rol: "usuarioGoogle",
    img: userdata.img,
    token: "",
    uidgoogle: userdata.uidgoogle
  });

  const [estado, setEstado] = useState({
    message: "",
    estado: "",
    token: ""
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    /*
    // Verifying that the form fields are not empty
    const emptyFields = Object.values(credentials).some(value => value === "");
    if (emptyFields) {

      alert("Los campos no pueden estar vacios.");

      console.error("Los campos no pueden estar vacios.");
      return;
    }
    */

    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error en la conexión.');
      }
      return res.json();
    })
    .then(data => {
      if (data.message === "Usuario registrado con exito") {
        setEstado({
          message: data.message,
          estado: 200,
          token: data.token
        });
      } else {
        setEstado({
          message: data.message,
          estado: 401
        });
      }      
      router.push("/registrar");
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  if (estado.message === "Usuario registrado con exito") {
    sessionStorage.setItem('tokenFront', estado.token);
    router.push("../privado");
  }

  return (
    <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
      <div className="container mx-auto items-center flex flex-wrap">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-30">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              {estado.message === '' ? (
                <>
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Registro de usuario desde Google</small>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap">
                    <div className="w-full px-4 flex-1">
                      <input
                        type="hidden"
                        name="img"
                        value={userdata.img}
                      />
                      <input
                        type="hidden"
                        name="uidgoogle"
                        value={userdata.uidgoogle}
                      />
                      <img src={userdata.img} alt="profile" />
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="nombre">
                          Nombre
                      </label>
                      <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="nombre" type="text" id="nombre" value={userdata.nombre} onChange={handleChange} required />        
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="apellido">
                          Apellido
                      </label>
                      <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="apellido" type="text" id="apellido" onChange={handleChange} required />
                      {credentials.apellido === "" && (
                        <span className="text-red-500 text-xs">Este campo es requerido</span>
                      )}
      
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="username">
                          Username
                      </label>
                      <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="username" type="text" id="username" onChange={handleChange} required />
                      {credentials.username === "" && (
                        <span className="text-red-500 text-xs">Este campo es requerido</span>
                      )}
                    </div>
                    <div className="w-full px-4 flex-1">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email">
                          Email
                      </label>
                      <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="email" type="email" id="email" value={userdata.email} onChange={handleChange} disabled />
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="password">
                          Password
                      </label>
                      <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="password" type="password" id="password" onChange={handleChange} required />
                      {credentials.password === "" && (
                        <span className="text-red-500 text-xs">Este campo es requerido</span>
                      )}
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="telefono">
                          Telefono
                      </label>
                      <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="telefono" type="text" id="telefono" onChange={handleChange} required />
                      {credentials.telefono === "" && (
                        <span className="text-red-500 text-xs">Este campo es requerido</span>
                      )}
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="rol">
                          Rol
                      </label>
                      <input
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="rol" type="text" value={userdata.rol} id="rol" onChange={handleChange} disabled />
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <button 
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"><span className="px-1"><FontAwesomeIcon icon={faSignIn} size="2x" /></span>Sign in</button>
                  </div>
                  </form>
                </>
              ) : (
                <div>
                  <div className={`text-white px-6 py-4 border-0 rounded relative mb-4 ${estado.estado === 200 ? "bg-green-500" : "bg-red-500"}`}>
                    <span className="text-xl inline-block mr-5 align-middle">
                      <FontAwesomeIcon icon={estado.estado === 200 ? faBell : faExclamationTriangle} size="2x" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                      <b className="capitalize">Mensaje:</b> {estado.message}!
                    </span>
                  </div>
                  <h1>Será redireccionado automáticamente a la sección correspondiente a su rol.</h1>
                </div>
                
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}