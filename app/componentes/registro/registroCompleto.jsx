import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faBell, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


export default function Index( {estado, credentials, handleChange, handleSubmit}) {

    return (

        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container-xl px-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    
                                    {estado.message === '' ? (
                                    <>
                                        <div className="card-header justify-content-center">
                                            <h3 className="fw-light my-4">Registrar usuario</h3>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="row gx-3">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="small mb-1">Nombre</label>
                                                            <input className="form-control" name="nombre" type="text" id="nombre" onChange={handleChange} required />
                                                            {credentials.nombre === "" && (
                                                                <span className="danger text-xs">Este campo es requerido</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="small mb-1" >Apellido</label>
                                                            <input className="form-control" name="apellido" type="text" id="apellido" onChange={handleChange} required />
                                                            {credentials.apellido === "" && (
                                                                <span className="danger text-xs">Este campo es requerido</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                                
                                                <div className="row gx-3">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="small mb-1">Usuario</label>
                                                            <input className="form-control" name="username" type="text" id="username" onChange={handleChange} required />
                                                            {credentials.username === "" && (
                                                                <span className="text-red-500 text-xs">Este campo es requerido</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="small mb-1" >Rol</label>
                                                            <input className="form-control"   name="rol" type="text" id="rol" onChange={handleChange} required />
                                                            {credentials.rol === "" && (
                                                                <span className="text-red-500 text-xs">Este campo es requerido</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row gx-3">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="small mb-1" >Correo</label>
                                                            <input className="form-control"  name="email" type="email" id="email" onChange={handleChange} required />
                                                            {credentials.email === "" && (
                                                                <span className="text-red-500 text-xs">Este campo es requerido</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row gx-3">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="small mb-1" >Password</label>
                                                            <input className="form-control" name="password" type="password" id="password" onChange={handleChange} required />
                                                            {credentials.password === "" && (
                                                                <span className="text-red-500 text-xs">Este campo es requerido</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="small mb-1" >Telefono</label>
                                                            <input className="form-control" name="telefono" type="text" id="telefono" onChange={handleChange} required />
                                                            {credentials.telefono === "" && (
                                                                <span className="text-red-500 text-xs">Este campo es requerido</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            <div className="w-full lg:w-12/12 px-4">
                                            <button 
                                                className="btn btn-primary btn-block"
                                                type="submit"><span className="px-1"><FontAwesomeIcon icon={faSignIn} size="2x" /></span>Registrar Usuario</button>
                                            </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center">
                                            <div className="small"><a href="./">Volver al inicio</a></div>
                                        </div>
                                    </>
                                    ) : (
                                        <div>
                                            <div className={'alert alert-icon ${estado.estado === 200 ? "alert-primary" : "alert-secondary"}'} role="alert">
                                                <button className="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
                                                <div className="alert-icon-aside">
                                                    <i className="far fa-flag"></i>
                                                </div>
                                                <div className="alert-icon-content">
                                                    <h6 className="alert-heading">Resultado</h6>
                                                    {estado.message}!
                                                </div>
                                            </div>
                                            <div className="card-footer text-center">
                                                <div className="small"><a href="./">Volver al inicio</a></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );

}