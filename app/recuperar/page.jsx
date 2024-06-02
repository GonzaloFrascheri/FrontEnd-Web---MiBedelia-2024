"use client";
import { useState } from "react";
import axios from "@/utils/axios";
import Footer from '@/app/componentes/main/footer';

function RecuperarPage() {
  const [ci, setCi] = useState("");
  const [message, setMessage] = useState("");

  const handleCiChange = (e) => {
    setCi(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const formData = {
        ci: ci
      };
      const { data,status } = await axios.post("/solicitudRecuperacion", formData);
      setMessage(data.message);
    } catch (error) {
      console.error("Hubo un problema al enviar la solicitud:", error);
      setMessage("Hubo un problema al enviar la solicitud.");
    }
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-xl px-4">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">
                <div className="card my-5">
                  <div className="card-body p-5 text-center">
                    <div className="h3 fw-light mb-3">Recuperar Contraseña</div>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body p-5">
                    <form id="recuperar" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="text-gray-600 small" htmlFor="ciInput">Cédula</label>
                        <input
                          id="ciInput"
                          className="form-control form-control-solid"
                          type="text"
                          placeholder="Cédula"
                          minLength="7"
                          maxLength="8"
                          value={ci}
                          onChange={handleCiChange}
                        />
                      </div>
                      <button className="btn btn-primary" type="submit">Enviar</button>
                    </form>
                    {message && (
                      <div className="mt-3">
                        <div className="alert alert-info">{message}</div>
                      </div>
                    )}
                  </div>
                  <hr className="my-0" />
                  <div className="card-body px-5 py-4">
                    <div className="small text-center">
                      <a className="ms-2" href="./login">Volver al Login</a>
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
        <Footer />
      </div>
    </div>
  );
}

export default RecuperarPage;
