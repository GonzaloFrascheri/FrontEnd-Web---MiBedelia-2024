'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowAltCircleLeft,
  faArrowCircleRight,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component'

const TableWithPagination = ({ data, columns, page, setPage, loading }) => {
  const pageSize = 10
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(data.length / pageSize)

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={paginatedData}
        pagination
        paginationServer
        paginationTotalRows={data.length}
        paginationDefaultPage={page}
        onChangePage={handlePageChange}
        progressPending={loading}
      />
      <div className='d-flex justify-content-between'>
        <button
          className='btn btn-outline-primary'
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Anterior
        </button>
        <span className='align-self-center'>
          Página {page} de {totalPages}
        </span>
        <button
          className='btn btn-outline-primary'
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          Siguiente <FontAwesomeIcon icon={faArrowCircleRight} />
        </button>
      </div>
    </div>
  )
}

const Section = ({
  title,
  data,
  columns,
  page,
  setPage,
  loading,
  isOpen,
  toggleSection
}) => (
  <div>
    <h4 onClick={toggleSection} style={{ cursor: 'pointer' }}>
      {title} <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
    </h4>
    {isOpen && (
      <TableWithPagination
        data={data}
        columns={columns}
        page={page}
        setPage={setPage}
        loading={loading}
      />
    )}
  </div>
)

export default function ActividadReciente ({ actividadReciente, onBack }) {
  const {
    usuario,
    inscripcionCarreraDtos,
    inscripcionAsignatura,
    inscripcionExamenes,
    registroAcceso,
    registroCambioPass
  } = actividadReciente

  const [carreraPage, setCarreraPage] = useState(1)
  const [asignaturaPage, setAsignaturaPage] = useState(1)
  const [examenPage, setExamenPage] = useState(1)
  const [accesoPage, setAccesoPage] = useState(1)
  const [cambioPassPage, setCambioPassPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [openSections, setOpenSections] = useState({
    carreras: true,
    asignaturas: false,
    examenes: false,
    accesos: false,
    cambioPass: false
  })

  const toggleSection = section => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }))
  }

  const sectionData = [
    {
      key: 'carreras',
      title: 'Inscripciones a Carreras',
      data: inscripcionCarreraDtos,
      columns: [
        {
          name: 'Nombre Carrera',
          selector: row => row.nombreCarrera,
          sortable: true
        },
        {
          name: 'Fecha Inscripción',
          selector: row => new Date(row.fechaInscripcion).toLocaleDateString(),
          sortable: true
        }
      ],
      page: carreraPage,
      setPage: setCarreraPage
    },
    {
      key: 'asignaturas',
      title: 'Inscripciones a Asignaturas',
      data: inscripcionAsignatura,
      columns: [
        {
          name: 'Nombre Asignatura',
          selector: row => row.nombreAsignatura,
          sortable: true
        },
        {
          name: 'Fecha Inscripción',
          selector: row => new Date(row.fechaInscripcion).toLocaleDateString(),
          sortable: true
        }
      ],
      page: asignaturaPage,
      setPage: setAsignaturaPage
    },
    {
      key: 'examenes',
      title: 'Inscripciones a Exámenes',
      data: inscripcionExamenes,
      columns: [
        {
          name: 'Nombre Examen',
          selector: row => row.nombreExamen,
          sortable: true
        },
        {
          name: 'Fecha Inscripción',
          selector: row => new Date(row.fechaInscripcion).toLocaleDateString(),
          sortable: true
        }
      ],
      page: examenPage,
      setPage: setExamenPage
    },
    {
      key: 'accesos',
      title: 'Registro de Accesos',
      data: registroAcceso,
      columns: [
        {
          name: 'Fecha',
          selector: row => new Date(row.fecha).toLocaleString(),
          sortable: true
        },
        {
          name: 'Estado',
          selector: row => (row.activo ? 'Activo' : 'Inactivo'),
          sortable: true
        }
      ],
      page: accesoPage,
      setPage: setAccesoPage
    },
    {
      key: 'cambioPass',
      title: 'Registro de Cambios de Contraseña',
      data: registroCambioPass,
      columns: [
        {
          name: 'Fecha',
          selector: row => new Date(row.fecha).toLocaleString(),
          sortable: true
        },
        {
          name: 'Estado',
          selector: row => (row.activo ? 'Activo' : 'Inactivo'),
          sortable: true
        }
      ],
      page: cambioPassPage,
      setPage: setCambioPassPage
    }
  ]

  return (
    <div style={{ padding: '20px' }} className='container'>
      <div className='card'>
        <div className='card-header'>
          <button className='btn btn-outline-primary' onClick={onBack}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver
          </button>
        </div>
        <div className='card-body'>
          <h3>
            Actividad Reciente de <span style={{color: "#144ee9"}}> {usuario.nombre} {usuario.apellido} </span>
          </h3>
          <p>
            {' '}
            <b>Cédula:</b> {usuario.ci}
          </p>
          <p>
            {' '}
            <b>Rol:</b> {usuario.rol}
          </p>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {sectionData.map(
              section =>
                section.data &&
                section.data.length > 0 && (
                  <Section
                    key={section.key}
                    title={section.title}
                    data={section.data}
                    columns={section.columns}
                    page={section.page}
                    setPage={section.setPage}
                    loading={loading}
                    isOpen={openSections[section.key]}
                    toggleSection={() => toggleSection(section.key)}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
