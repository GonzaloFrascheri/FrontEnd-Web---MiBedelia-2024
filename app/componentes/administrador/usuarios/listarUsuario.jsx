'use client'
import { useEffect, useState, useRef } from 'react'
import axios from '@/utils/axios'
import { userAuthenticationCheck } from '@/utils/auth'
import { useRouter, usePathname } from 'next/navigation'

export default function ListarUsuarios ({ estado, ListUsuarios }) {
  const router = useRouter()
  const pathname = usePathname()
  const [usuarios, setUsuarios] = useState(ListUsuarios.items || [])
  const [pageIndex, setPageIndex] = useState(ListUsuarios.pageIndex || 1)
  const [totalPages, setTotalPages] = useState(ListUsuarios.totalPages || 1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const pageSize = 10
  const cachedPages = useRef({})

  useEffect(() => {
    const fetchData = async () => {
      if (cachedPages.current[pageIndex]) {
        setUsuarios(cachedPages.current[pageIndex])
        return
      }

      setIsLoading(true)

      // User auth guard
      userAuthenticationCheck(router, pathname)

      try {
        const { data } = await axios.get(
          `/Administrador/listarUsuario?page=${pageIndex}&pageSize=${pageSize}`
        )

        cachedPages.current[pageIndex] = data.items
        setUsuarios(data.items)
        setTotalPages(data.totalPages)
        setIsLoading(false)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
        if (error.response && error.response.status === 401) {
          alert(error.response.data.message)
        }
        setError(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [pageIndex, router, pathname])

  const handleNextPage = () => {
    if (pageIndex < totalPages) {
      setPageIndex(pageIndex + 1)
    }
  }

  const handlePrevPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1)
    }
  }

  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          {estado.message === '' ? (
            <>
              <div className='card-header justify-content-center'>
                <h3 className='fw-light text-center'>Listado de Usuarios</h3>
              </div>
              <div className='card-body'>
                <div className='row gx-3 justify-content-center'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      {isLoading ? (
                        <div className='text-center'>Cargando...</div>
                      ) : error ? (
                        <div className='text-center'>
                          Error: {error.message}
                        </div>
                      ) : usuarios.length > 0 ? (
                        <div className='card-body'>
                          <h5>Listado de Usuarios</h5>
                          <ul>
                            {usuarios.map(usuario => (
                              <li key={usuario.id}>
                                {usuario.nombre} {usuario.apellido} -{' '}
                                {usuario.email} - {usuario.rol}
                              </li>
                            ))}
                          </ul>
                          <div className='pagination justify-content-between'>
                            <button
                              className='btn btn-primary'
                              onClick={handlePrevPage}
                              disabled={pageIndex === 1}
                            >
                              Anterior
                            </button>
                            <span>
                              Página {pageIndex} de {totalPages}
                            </span>
                            <button
                              className='btn btn-primary'
                              onClick={handleNextPage}
                              disabled={pageIndex === totalPages}
                            >
                              Siguiente
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className='text-center'>
                          No hay usuarios para mostrar.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-footer text-center'></div>
            </>
          ) : (
            <div>
              <div
                className={`alert alert-icon ${
                  estado.estado === 200 ? 'alert-primary' : 'alert-secondary'
                }`}
                role='alert'
              >
                <button
                  className='btn-close'
                  type='button'
                  data-bs-dismiss='alert'
                  aria-label='Close'
                ></button>
                <div className='alert-icon-aside'>
                  <i className='far fa-flag'></i>
                </div>
                <div className='alert-icon-content'>
                  <h6 className='alert-heading'>Resultado</h6>
                  {estado.message}!
                </div>
              </div>
              <div className='card-footer text-center'>
                <div className='small'>
                  <a href='/privado'>Volver al inicio</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
