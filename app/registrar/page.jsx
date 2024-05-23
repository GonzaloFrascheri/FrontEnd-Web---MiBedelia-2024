"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RegistroBasico from '@/app/componentes/registro/registroBasico.jsx';
import axios from "@/utils/axios";
import { hashPassword } from "@/utils/utils"

function RegistrarPage() {

  const router = useRouter();
  const [estado, setEstado] = useState({
    message: "",
    estado: ""
  });
  const [formData, setformData] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    email: "",
    telefono: "",
    password: ""
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifying that the form fields are not empty
    const emptyFields = Object.values(formData).some(value => value === "");
    if (emptyFields) {

      alert("Los campos no pueden estar vacios.");

      console.error("Los campos no pueden estar vacios.");
      return;
    }

    try {
      const hashedPassword = await hashPassword(formData.password);
      const updatedFormData = {
        ...formData,
        password: hashedPassword,
      };
      
      console.info("formData: ", updatedFormData);
      const { data, status } = await axios.post("/register", formData);
      if (status === 200) {
        setEstado({
          message: data.message,
          estado: status
        });
      }
    } catch (error) {
      console.error("Error during form submission", error);
      /*
      const { data, status } = error.response;
      setEstado({
        message: data.message,
        estado: status
      });
      */
    }
  };

  return (
    <>
      <RegistroBasico estado={estado} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
}

export default RegistrarPage;
