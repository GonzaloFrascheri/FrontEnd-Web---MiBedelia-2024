export default function Login({ handleSubmit, call_login_google, setCredentials, credentials }) {
    

    return (
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
    );
}