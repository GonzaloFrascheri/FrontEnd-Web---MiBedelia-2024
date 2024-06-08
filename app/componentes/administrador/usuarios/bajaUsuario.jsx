'use client'
import { useEffect, useState, useRef } from 'react'
import axios from '@/utils/axios'
import { useRouter, usePathname } from 'next/navigation'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function ListarUsuarios () {
  const router = useRouter()
  const pathname = usePathname()
  const [estado, setEstado] = useState({estado: "",message: ""});
  const [data, setData]= useState([]);
  const [search, SetSearch]= useState('');
  const [filter, setFilter]= useState([]);

  const handleDelete = async (userId, userNombre, userApellido) => {
    try {
      // Llamada a la API para eliminar el usuario
      const { data, status } = await axios.delete(`Administrador/borrarUsuario?userId=${userId}`);
      
      if (status === 200) {
        setEstado({
          message: data.message + ' Se eliminó el usuario: [' + userId + '] ' + userNombre + ' ' + userApellido,
          estado: data.evento
        });
      }
    } catch (error) {
      console.log(error)
      setEstado({
        estado: error.status,
        message: error.status
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
  const getListUsuarios = async() => {
    try{
        const {data, status } = await axios.get('Administrador/listarUsuario?page=1&pageSize=300');
        const filteredItems = data.items.filter(item => item.status === true);
        setData(filteredItems);
        setFilter(filteredItems);
    } catch(error){
      console.log(error);
      setEstado({
        estado: error.status,
        message: error.message
      });
    }
  }
  useEffect(()=>{
      getListUsuarios();
  }, []);
  useEffect(()=>{
      const result= data.filter((item)=>{
       return item.ci.toLowerCase().match(search.toLocaleLowerCase());
      });
      setFilter(result);
  },[search]);
  function Loader() {
    return <div className='text-center'><FontAwesomeIcon icon={faSpinner} spin /></div>
  }
  const tableHeaderstyle={
    headCells:{
        style:{
            fontWeight:"bold",
            fontSize:"14px",
            backgroundColor:"#ccc"
        },
    },
  }

  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
            <div className='card-header justify-content-center'>
              <h3 className='fw-light text-center'>Listado de Usuarios a dar de baja</h3>
            </div>
            {estado.message !== '' ?  (
              <>
                <div className='card-body'>
                  <div
                    className={`alert alert-icon m-2 ${
                      estado.estado === 200 ? 'alert-primary' : 'alert-secondary'
                    }`}
                    role='alert'
                  >
                    <button
                      className='btn-close'
                      type='button'
                      data-bs-dismiss='alert'
                      aria-label='Close'
                      onClick={()=>setEstado({estado: 0, message: ""})}
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
            ):(
              <>
                <div className='card-body'>
                  <div className='row gx-3 justify-content-center'>
                    <DataTable
                      customStyles={ tableHeaderstyle}
                      columns={columnas}
                      data={filter}
                      pagination
                      fixedHeader
                      highlightOnHover
                      subHeader
                      subHeaderComponent={
                          <input type="text"
                          className="w-25 form-control"
                          placeholder="Buscar por cédula de identidad..."
                          value={ search}
                          onChange={(e)=>SetSearch(e.target.value)}
                          
                          />
                      }
                      subHeaderAlign="right"
                      progressComponent={<Loader />}
                    />
                  </div>
                </div>
                <div className='card-footer text-center'></div>
              </>
            )}
        </div>
      </div>
    </div>
  )
}
