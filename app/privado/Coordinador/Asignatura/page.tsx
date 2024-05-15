'use client'

import { useState } from "react";

function AltaAsignatura() {
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    creditos: "",
    descripcion: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu backend o realizar cualquier otra acción necesaria
    console.log(formData);
    // Limpia el formulario después de enviar los datos
    setFormData({
      nombre: "",
      codigo: "",
      creditos: "",
      descripcion: ""
    });
  };

  return (
    <div>
      <h1>Alta de Asignatura</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="codigo">Código:</label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="creditos">Créditos:</label>
          <input
            type="text"
            id="creditos"
            name="creditos"
            value={formData.creditos}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default AltaAsignatura;
