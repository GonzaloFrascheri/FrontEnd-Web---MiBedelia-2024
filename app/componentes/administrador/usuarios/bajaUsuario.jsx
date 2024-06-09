'use client'
import { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import { useRouter, usePathname } from 'next/navigation'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faArrowAltCircleLeft, faArrowCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function ListarUsuarios () {
  const router = useRouter()
  const pathname = usePathname()
  const [estado, setEstado] = useState({ estado: "", message: "" });
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const handleDelete = async (userId, userNombre, userApellido) => {
    try {
      const { data, status } = await axios.delete(`Administrador/borrarUsuario?userId=${userId}`);
      
      if (status === 200) {
        setEstado({
          message: data.message + ' Se eliminó el usuario: [' + userId + '] ' + userNombre + ' ' + userApellido,
          estado: data.evento
        });
        // Refresca la lista después de eliminar
        fetchUsers(currentPage, search);
      }
    } catch (error) {
      console.log(error)
      setEstado({
        estado: error.response?.status,
        message: error.message
      })
    }
  };

  const columnas = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: 'ci',
      selector: (row) => row.ci,
      sortable: true,
    },
    {
      name: 'nombre',
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: 'apellido',
      selector: (row) => row.apellido,
      sortable: true,
    },
    {
      name: 'rol',
      selector: (row) => row.rol,
      sortable: true,
    },
    {
      name: 'email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'accion',
      selector: (row) => (
        <button
          className="btn btn-outline-red btn-xs"
          onClick={() => handleDelete(row.id, row.nombre, row.apellido)}
        >
          Eliminar
        </button>
      )
    }
  ];

  const fetchUsers = async (page = 1, searchText = '') => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(`Administrador/listarUsuario?page=${page}&pageSize=10&searchText=${searchText}`);
      if (status === 200) {
        const filteredItems = data.items.filter(item => item.status === true);
        setData(filteredItems);
        setTotalRows(data.totalPages);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log(error);
      setEstado({
        estado: error.response?.status,
        message: error.message
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(currentPage, search);
  }, [currentPage, search]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length >= 3) {
      setCurrentPage(1); // Reinicia la paginación cuando se realiza una nueva búsqueda
    } else if (value.length === 0) {
      fetchUsers(1, ''); // Reinicia la búsqueda cuando el input está vacío
    }
  };

  function Loader() {
    return <div className='text-center'><FontAwesomeIcon icon={faSpinner} spin /></div>
  }

  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc"
      },
    },
  }

  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          <div className='card-header justify-content-center'>
            <h3 className='fw-light text-center'>Baja de Usuario</h3>
          </div>
          {estado.message !== '' ? (
            <>
              <div className='card-body'>
                <div
                  className={`alert alert-icon m-2 ${estado.estado === 200 ? 'alert-primary' : 'alert-secondary'}`}
                  role='alert'
                >
                  <button
                    className='btn-close'
                    type='button'
                    data-bs-dismiss='alert'
                    aria-label='Close'
                    onClick={() => setEstado({ estado: 0, message: "" })}
                  ></button>
                  <div className='alert-icon-aside'>
                    <i className='far fa-flag'></i>
                  </div>
                  <div className='alert-icon-content'>
                    <h6 className='alert-heading'>Resultado</h6>
                    {estado.message}!
                  </div>
                </div>
              </div>
              <div className='card-footer text-center'>
                <div className='small'>
                  <a href='/privado/Administrador/Usuarios/Baja'>Volver</a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='card-body'>
                <div className='row gx-3 justify-content-center'>
                  <DataTable
                    customStyles={tableHeaderstyle}
                    columns={columnas}
                    data={data}
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={(page) => setCurrentPage(page)}
                    fixedHeader
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                      <div className="w-50 input-group input-group-joined">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input 
                          className="form-control ps-0" 
                          type="text"
                          placeholder="Buscar por cédula de identidad..."
                          value={search}
                          onChange={handleSearch}
                        />
                      </div>
                    }
                    subHeaderAlign="right"
                    progressPending={loading}
                    progressComponent={<Loader />}
                  />
                </div>
              </div>
              <div className='card-footer text-center'>
                <button 
                  className='btn btn-outline-green btn-icon-split btn-sm'
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                </button>
                <span className='p-2'>{currentPage} de {totalPages}</span>
                <button 
                  className='btn btn-outline-green btn-icon-split btn-sm'
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
