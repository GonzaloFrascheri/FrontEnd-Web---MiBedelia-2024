# Swagger
https://mibedelia-backend-production.up.railway.app/doc/swagger-ui/index.html#/

## Tareas - Casos de uso críticos 
- Invitado
  - Iniciar sesión <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Registrarse como estudiante <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
- Administrador
  - Alta de Usuario <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Baja de Usuario <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Listar Usuario <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
- Coordinador	
  - Alta carrera	<img src="https://img.shields.io/badge/Front-Hecho-successs"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Alta Asignatura	<img src="https://img.shields.io/badge/Front-Hecho-successs"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
- Estudiante	
  - Inscripción a una carrera	<img src="https://img.shields.io/badge/Front-Hecho-successs"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Inscripción a una asignatura <img src="https://img.shields.io/badge/Front-Hecho-success">	
  <img src="https://img.shields.io/badge/BackEnd-Hecho-success">
  - Inscripción a un examen <img src="https://img.shields.io/badge/Front-Hecho-success">	
  <img src="https://img.shields.io/badge/BackEnd-Hecho-success">
  
- Funcionario	
  - Generar acta fin de curso	<img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/BackEnd-Hecho-success">
  - Generar acta examen	<img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/BackEnd-Hecho-success">
  - Registro horario en asignatura	<img src="https://img.shields.io/badge/Front-Hecho-success">	<img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Registro periodo examen <img src="https://img.shields.io/badge/Front-Hecho-successs">	<img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Registro examen relacionado a una asignatura dada	<img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Alta docente	<img src="https://img.shields.io/badge/Front-Hecho-successs"> <img src="https://img.shields.io/badge/Backend-Hecho-success">

## Tareas - Casos de uso no críticos 
- Invitado
  - Recuperar contraseña <img src="https://img.shields.io/badge/Front-Hecho-Success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Cerrar sesión <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Editar perfil <img src="https://img.shields.io/badge/Front-Hecho-Success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
- Administrador
  - Buscar usuarios <img src="https://img.shields.io/badge/Front-hecho-succes"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Resumen de actividad <img src="https://img.shields.io/badge/Front-Hecho-Success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
- Coordinador
  - Registrar previaturas <img src="https://img.shields.io/badge/Front-Hecho-succes"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Listar previas por asignatura <img src="https://img.shields.io/badge/Front-Hecho-succes"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Listar asignaturas por carrera <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
- Funcionario
  - Modificar horario de una asignatura <img src="https://img.shields.io/badge/Front-Hecho-Success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Modificar horario de un exámen <img src="https://img.shields.io/badge/Front-Hecho-Success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Listar estudiantes inscriptos en asignatura <img src="https://img.shields.io/badge/Front-hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Listar exámenes a tomar en período <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
- Estudiantes
  - Generar escolaridad <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Listado de asignaturas aprobadas <img src="https://img.shields.io/badge/Front-Hecho-Success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">
  - Listado de asignaturas pendientes <img src="https://img.shields.io/badge/Front-Hecho-success"> <img src="https://img.shields.io/badge/Backend-Hecho-success">

## Tareas - Notificaciones 
- Estudiantes
  - Mostrar notificaciones sin leer <img src="https://img.shields.io/badge/Front-EnProceso-yellow"> <img src="https://img.shields.io/badge/Backend-Hecho-success">

# INSTALACIÓN DEL FRONTEND
```bash
# instalar next
npm i next
# instalar typescript
npm i -D typescript
# instalar tailwind
npm i -D tailwindcss postcss autoprefixer
# instalar jwt-decode
// npm i jwt-decode
npm install @types/jwt-decode
# conflictos con versiones
# limpiar cache de npm
npm cache clean --force
# instala la ultima version de npm
npm i -g npm@latest
# de ser necesario instalar chocolaty
npm i choco
# verificar instalancian de la app
npm run
# ejecutar
npm run dev
```

# INSTALACIÓN DE DEPENDENCIAS
```bash
### instalar dependencias faltantes
npm i @
# instalar iconos
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
npm i react-native-vector-icons
# tools tips
npm i react-native-elements
# dependencia para crear pdf
npm install jspdf
npm install jspdf jspdf-autotable
# instalar simple-table
npm install react-data-table-component
# instalar dependencia para manipular el calendario
npm install react-datepicker date-fns
# instalar dependencia para creacion de excell
npm install xlsx
```

# INSTALACIÓN DE DEPENDENCIAS PARA GRAFOS
```bash
# ejemplos
# https://visjs.github.io/vis-network/examples/
npm i vis-network
# instalar boostraps
npm i bootstrap
```
