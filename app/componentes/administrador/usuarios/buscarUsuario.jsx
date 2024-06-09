'use client'
import { useEffect, useState, useRef } from 'react'
import axios from '@/utils/axios'
import { useRouter, usePathname } from 'next/navigation'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faArrowAltCircleLeft, faArrowCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function BuscarUsuarios () {
    const router = useRouter()
    const pathname = usePathname()
    const [estado, setEstado] = useState({estado: 0,message: "",});
    const [data, setData]= useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [filter, setFilter]= useState([]);
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
        name: 'Imagen',
        selector: (row) => <img height={30} width={30} src='/img/perfil.png' alt='Imagen' />,
        width: '100px',
    }
    ];

    const getListUsuarios = async (page = 1, pageSize = 10, search = '') => {
        try {
          const { data, status } = await axios.get(`/Administrador/listarUsuario?page=${page}&pageSize=${pageSize}&searchText=${search}`);
          const filteredItems = data.items.filter(item => item.status === true);
          setData(filteredItems);
          setFilter(filteredItems);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.log(error);
          setEstado({
            estado: error.status,
            message: error.message
          });
        }
      };
      

      useEffect(() => {
        getListUsuarios(page, pageSize, search);
      }, [page, pageSize, search]);

      useEffect(() => {
        setPage(1); // Reset to first page on search
        getListUsuarios(1, pageSize, search);
      }, [search]);
      

    useEffect(() => {
        const result = data.filter((item) => {
        return (
            item.apellido.toLowerCase().includes(search.toLowerCase()) ||
            item.nombre.toLowerCase().includes(search.toLowerCase()) ||
            item.ci.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.rol.toLowerCase().includes(search.toLowerCase())
        );
        });
        setFilter(result);
    }, [search]);

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
                <h3 className='fw-light text-center'>Buscar Usuarios</h3>
              </div>
              {estado.message === '' ? (
                <>
                  <div className='card-body'>
                    <div className='row gx-3 justify-content-center'>
                      <DataTable
                        customStyles={tableHeaderstyle}
                        columns={columnas}
                        data={filter}
                        fixedHeader
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <div class="w-50 input-group input-group-joined">
                                <span class="input-group-text">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <input 
                                    class="form-control ps-0" 
                                    type="text" 
                                    placeholder="Buscar por nombre, apellido, cédula, correo o rol..." 
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                      disabled={page === 1}
                    >
                      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    </button>
                    <span className='p-2'>{page} de {totalPages}</span>
                    <button 
                     className='btn btn-outline-green btn-icon-split btn-sm'
                      onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                      disabled={page === totalPages}
                    >
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <div className='card-body'>
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
