"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegistroBasico from '../componentes/registro/registroBasico.jsx';

function RegistrarPage() {

  const router = useRouter();
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [credentials, setCredentials] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
    telefono: "",
    rol: ""
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifying that the form fields are not empty
    const emptyFields = Object.values(credentials).some(value => value === "");
    if (emptyFields) {

      alert("Los campos no pueden estar vacios.");

      console.error("Los campos no pueden estar vacios.");
      return;
    }

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
          estado: 200
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

  return (
    <>
      <RegistroBasico estado={estado} credentials={credentials} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
}

export default RegistrarPage;
