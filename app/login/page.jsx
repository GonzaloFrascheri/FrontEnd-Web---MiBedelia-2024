"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import validators from "@/utils/validators";
import axios from "@/utils/axios";
import storage from "@/utils/storage";
import { hashPassword } from "@/utils/utils"

function LoginPage() {
  const router = useRouter();

  // constantes para el login
  const [credentials, setCredentials] = useState({
    ci: "",
    password: "",
  });

  const [userData, setUserData] = useState({
    nombre: "",
    username: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "usuarioGoogle",
    img: "",
    token: "",
    uidgoogle: "",
  });

  const [error, setError] = useState("");
  const [errorP, setErrorP] = useState("");

  // Campo cedula
  const handleCiChange = (e) => {
    const ci = e.target.value;
    const error = validators.validateCi(ci);

    // Change value
    setCredentials({ ...credentials, ci: ci });

    // Set error if any
    setError(error);
  };

  // Campo contraseña
  const handlePaswordChange = (e) => {
    const password = e.target.value;
    const error = validators.validatePassword(password);

    // Change value
    setCredentials({ ...credentials, password: password });

    // Set error if any
    setErrorP(error);
  };

  // enviar formulario de login
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = {
        ...credentials,
        password: await hashPassword(credentials.password),
      };

      // Send request to server
      const { data, status } = await axios.post("/login", formData);

      if (status === 200) {
        storage.setToken(data.token);
        storage.setUser(userData);
        router.push("/privado");
      }

      // Manejo de errores
    } catch (error) {
      const { status, data } = error.response;
      if (status === 401) {
        alert(data.message);

        // Resetear formulario
        setCredentials({
          ci: "",
          password: "",
        });
      } else {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  return (
    <>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container-xl px-4">
              <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                  <div className="card my-5">
                    <div className="card-body p-5 text-center">
                      <div className="h3 fw-light mb-3">Iniciar Sesion</div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body p-5">
                      <form id="login" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="text-gray-600 small">Cedula</label>
                          <input
                            className="form-control form-control-solid"
                            type="text"
                            placeholder="Cedula"
                            maxLength="8"
                            value={credentials.ci}
                            onChange={handleCiChange}
                          />
                          {error && (
                            <div className="text-danger small mt-2">
                              {error}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="text-gray-600 small">
                            Contraseña
                          </label>
                          <input
                            className="form-control form-control-solid"
                            type="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handlePaswordChange}
                          />
                          {errorP && (
                            <div className="text-danger small mt-2">
                              {errorP}
                            </div>
                          )}
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-0">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              id="checkRememberPassword"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label">
                              Recuerdame
                            </label>
                          </div>
                          <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!!error || !!errorP}
                          >
                            Iniciar
                          </button>
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
                      <div className="small">
                        <a href="./">Volver al inicio</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
