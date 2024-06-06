import React, { useState, useEffect } from 'react'

function CustomAlert ({ estado, closable = true }) {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (estado.message !== '') {
      setShowAlert(true)
    }
  }, [estado])

  const handleClose = () => {
    setShowAlert(false)
  }

  return (
    showAlert && (
      <div
        className={`mt-3 justify-content-center text-center alert alert-icon ${
          estado.estado === 200 ? 'alert-success' : 'alert-danger'
        }`}
        role='alert'
      >
        {closable && (
          <button
            type='button'
            className='btn-close'
            aria-label='Close'
            onClick={handleClose}
          ></button>
        )}
        <div className='alert-icon-content text-center'>{estado.message}</div>
      </div>
    )
  )
}

export default CustomAlert
