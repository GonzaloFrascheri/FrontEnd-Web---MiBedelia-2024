'use client'
import { useState } from 'react'
import RegistroBasico from '@/app/componentes/registro/registroBasico.jsx'
import axios from '@/utils/axios'
import { hashPassword, handleRegisterFormValidation } from '@/utils/utils'

function RegistrarPage () {
  const [estado, setEstado] = useState({
    message: '',
    estado: ''
  })
  const [formData, setformData] = useState({
    nombre: '',
    apellido: '',
    ci: '',
    email: '',
    telefono: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    nombre: null,
    apellido: null,
    ci: null,
    email: null,
    telefono: null,
    password: null
  })

  const isFormValid = () => {
    return (
      Object.values(errors).every(error => error === '') &&
      Object.values(formData).every(value => value !== '')
    )
  }

  const handleValidation = (name, value) => {
    const error = handleRegisterFormValidation(name, value)
    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }))
  }

  const handleChange = e => {
    const { name, value } = e.target

    setformData({
      ...formData,
      [name]: value
    })

    handleValidation(name, value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!isFormValid()) {
      return
    }

    try {
      const hashedPassword = await hashPassword(formData.password)
      const updatedFormData = {
        ...formData,
        password: hashedPassword
      }
      const { data, status } = await axios.post('/register', updatedFormData)
      if (status === 200) {
        setEstado({
          message: data.message,
          estado: status
        })
      }
    } catch (error) {
      console.error('Error during form submission', error)
      /*
      const { data, status } = error.response;
      setEstado({
        message: data.message,
        estado: status
      });
      */
    }
  }

  return (
    <>
      <RegistroBasico
        estado={estado}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        isFormValid={isFormValid}
      />
    </>
  )
}

export default RegistrarPage
