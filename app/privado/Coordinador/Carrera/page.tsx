'use client'

import { useState } from "react";

function AltaCarrera() {
  const [formData, setFormData] = useState({
    nombre: "",
    duracion: "",
    nivel: "",
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
      duracion: "",
      nivel: "",
      descripcion: ""
    });
  };

  return (
    <div>
      <h1>Alta de Carrera</h1>
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
          <label htmlFor="duracion">Duración:</label>
          <input
            type="text"
            id="duracion"
            name="duracion"
            value={formData.duracion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nivel">Nivel:</label>
          <input
            type="text"
            id="nivel"
            name="nivel"
            value={formData.nivel}
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

export default AltaCarrera;
