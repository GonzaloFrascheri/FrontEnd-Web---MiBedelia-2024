
import React from "react";
import { useState } from "react";

export default function VerPerfilPage({ credentials }) {
    const [actualizar, setActualizar] = useState({
        id: "",
        telefono: ""
      });

    setActualizar.id = credentials.id;

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }
    return (
    <>
        <nav className="nav nav-borders">
            <a className="nav-link active ms-0" href="#">Perfil</a>
            <a className="nav-link" href="#">Notificaciones</a>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
            <div className="col-xl-4">
                <div className="card mb-4 mb-xl-0">
                    <div className="card-header">Imagen de perfil</div>
                    <div className="card-body text-center">
                        <img
                            alt="..."
                            src="../img/perfil.png"
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                    </div>
                </div>
            </div>
            <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header">Detalle de la cuenta</div>
                    <div className="card-body">
                        <form>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1">Nombre</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={credentials.nombre}
                                            readOnly
                                        />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1">Apellido</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                            id="apellido"
                                            name="apellido"
                                            value={credentials.apellido}
                                            readOnly
                                        />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="small mb-1">Correo</label>
                                <input 
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={credentials.email}
                                    readOnly
                                />
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1">Rol</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="rol"
                                        name="rol"
                                        value={credentials.rol}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1">Telefono</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        value={credentials.telefono}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}