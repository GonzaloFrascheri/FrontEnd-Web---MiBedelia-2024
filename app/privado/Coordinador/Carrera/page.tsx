'use client'

import React, { useState } from "react";
import Sidebar from "../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../componentes/navs/nav-privado.jsx';

function AltaCarrera() {
  const [formData, setFormData] = useState({
    nombre: "",
    duracion: "",
    nivel: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
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

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
      setIsSidebarToggled(!isSidebarToggled);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1 className="text-center">Alta de Carrera</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duracion" className="form-label">Duración:</label>
              <input
                type="text"
                id="duracion"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nivel" className="form-label">Nivel:</label>
              <input
                type="text"
                id="nivel"
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
              <div></div>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
              
              <div className="card-footer text-center">
                  <div className="small"><a href="./">Volver al inicio</a></div>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AltaCarrera;
