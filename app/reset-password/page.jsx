"use client"; // Asegúrate de que el componente se ejecute en el cliente
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/utils/axios";
import { validators } from "@/utils/validators";
import Footer from '@/app/componentes/main/footer';
import storage from "@/utils/storage";
import { hashPassword } from "@/utils/utils"


function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Token no válido o expirado.");
    }
  }, [token]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const passwordError = validators.validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
        const formData = {
            newPassword: await hashPassword(password)
        };
        storage.setToken(token);
        const { data } = await axios.post("/reset-password", formData );
        storage.clearToken();
        storage.clearUser();
        setSuccess(data.message);
        setError(null);
        

      } catch (error) {
        storage.clearToken();
        storage.clearUser();
        setError("Hubo un error al restablecer la contraseña.");
        setSuccess(null);

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
                    <div className="h3 fw-light mb-3">Restablecer Contraseña</div>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body p-5">
                    <form id="resetPassword" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="text-gray-600 small" htmlFor="passwordInput">Nueva Contraseña</label>
                        <input
                          id="passwordInput"
                          className="form-control form-control-solid"
                          type="password"
                          placeholder="Nueva Contraseña"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="text-gray-600 small" htmlFor="confirmPasswordInput">Confirmar Nueva Contraseña</label>
                        <input
                          id="confirmPasswordInput"
                          className="form-control form-control-solid"
                          type="password"
                          placeholder="Confirmar Nueva Contraseña"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                      </div>
                      {error && <div className="text-danger small mt-2">{error}</div>}
                      {success && <div className="text-success small mt-2">{success}</div>}
                      <div className="d-flex align-items-center justify-content-between mb-0">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          disabled={!token || !password || !confirmPassword}
                        >
                          Restablecer Contraseña
                        </button>
                      </div>
                    </form>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body px-5 py-4">
                    <div className="small text-center">
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

export default ResetPasswordPage;
