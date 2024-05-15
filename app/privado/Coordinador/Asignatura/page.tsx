'use client'

import React, { useState } from "react";
import Sidebar from "../../../componentes/siders/sidebar.jsx";
import NavPrivado from '../../../componentes/navs/nav-privado.jsx';

function AltaAsignatura() {
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    creditos: "",
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
      codigo: "",
      creditos: "",
      descripcion: ""
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="text-center mb-0">Alta de Asignatura</h1>
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
              <label htmlFor="codigo" className="form-label">Código:</label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="creditos" className="form-label">Créditos:</label>
              <input
                type="text"
                id="creditos"
                name="creditos"
                value={formData.creditos}
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
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
            <div className="card-footer text-center">
                <div className="small"><a href="./">Volver al inicio</a></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AltaAsignatura;
