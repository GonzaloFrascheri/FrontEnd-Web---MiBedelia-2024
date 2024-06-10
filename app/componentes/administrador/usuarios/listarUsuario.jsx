'use client'
import { useEffect, useState } from 'react'
import axios from '@/utils/axios'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSpinner,
  faArrowAltCircleLeft,
  faArrowCircleRight,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import ActividadReciente from './actividadReciente'

export default function ListarUsuarios () {
  const [estado, setEstado] = useState({ estado: 0, message: '' })
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState([])
  const [view, setView] = useState('table')
  const [selectedUser, setSelectedUser] = useState(null)
  const [actividadReciente, setActividadReciente] = useState(null)

  const columnas = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Ci',
      selector: row => row.ci,
      sortable: true
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true
    },
    {
      name: 'Rol',
      selector: row => row.rol,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    {
      name: 'Imagen',
      selector: row => (
        <img height={30} width={30} src='/img/perfil.png' alt='Imagen' />
      ),
      width: '100px'
    },
    {
      name: 'Ver actividad reciente',
      selector: row => (
        <button
          className='btn btn-primary btn-sm'
          onClick={() => verActividadReciente(row)}
        >
          Ver actividad
        </button>
      )
    }
  ]

  const getListUsuarios = async (page = 1, pageSize = 10, search = '') => {
    try {
      const { data, status } = await axios.get(
        `/Administrador/listarUsuario?page=${page}&pageSize=${pageSize}&searchText=${search}`
      )
      //const filteredItems = data.items.filter(item => item.status === true)
      setData(data.items)
      //setFilter(filteredItems)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.log(error)
      setEstado({
        estado: error.status,
        message: error.message
      })
    }
  }

  const verActividadReciente = async usuario => {
    try {
      const { data } = await axios.get(
        `/Administrador/actividadUsuario?userId=${usuario.id}`
      )
      setSelectedUser(usuario)
      setActividadReciente(data)
      setView('actividad')
    } catch (error) {
      console.log(error)
      setEstado({
        estado: error.status,
        message: error.message
      })
    }
  }

  useEffect(() => {
    getListUsuarios(page, pageSize, search)
  }, [page, pageSize, search])

  useEffect(() => {
    setPage(1) // Reset to first page on search
    getListUsuarios(1, pageSize, search)
  }, [search, pageSize])

  useEffect(() => {
    const result = data.filter(item => {
      return (
        item.apellido.toLowerCase().includes(search.toLowerCase()) ||
        item.nombre.toLowerCase().includes(search.toLowerCase()) ||
        item.ci.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.rol.toLowerCase().includes(search.toLowerCase())
      )
    })
    setFilter(result)
  }, [search, data])

  function Loader () {
    return (
      <div className='text-center'>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    )
  }

  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: '#ccc'
      }
    }
  }

  return (
    <div className='container-xl px-4 mt-n10'>
      <div className='card'>
        <div className='card shadow-lg border-0 rounded-lg'>
          {view === 'table' ? (
            <>
              <div className='card-header justify-content-center'>
                <h3 className='fw-light text-center'>Listar Usuarios</h3>
              </div>
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
                      <div className='w-50 input-group input-group-joined'>
                        <span className='input-group-text'>
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                          className='form-control ps-0'
                          type='text'
                          placeholder='Buscar por nombre, apellido, cédula, correo o rol...'
                          aria-label='Search'
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                        />
                      </div>
                    }
                    subHeaderAlign='right'
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
                <span className='p-2'>
                  {page} de {totalPages}
                </span>
                <button
                  className='btn btn-outline-green btn-icon-split btn-sm'
                  onClick={() =>
                    setPage(page < totalPages ? page + 1 : totalPages)
                  }
                  disabled={page === totalPages}
                >
                  <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
              </div>
            </>
          ) : (
            <ActividadReciente
              actividadReciente={actividadReciente}
              onBack={() => setView('table')}
            />
          )}
        </div>
      </div>
    </div>
  )
}
