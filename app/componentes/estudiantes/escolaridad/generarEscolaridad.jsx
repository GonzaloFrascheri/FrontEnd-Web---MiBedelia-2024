'use client'

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function GenerarPdfEscolaridad(){

    const GenerarPdfEscolaridad =  (data) => {
        /*
        // Extrae los datos necesarios del objeto de respuesta
        const { nombreEstudiante, cedula, carrera, fechaEmision, inscripcionesAsignaturas, inscripcionesExamenes } = data;

        // Crea un nuevo documento PDF
        const doc = new jsPDF();

        // Añade el título principal
        doc.setFontSize(20);
        doc.text('Escolaridad', 105, 10, null, null, 'center');

        // Añade la información académica
        doc.setFontSize(12);
        doc.text(`Nombre del estudiante: ${nombreEstudiante}`, 10, 20);
        doc.text(`Cédula: ${cedula}`, 10, 30);
        doc.text(`Carrera: ${carrera}`, 10, 40);
        doc.text(`Fecha de emisión: ${fechaEmision}`, 10, 50);

        // Añade la lista de asignaturas cursadas
        let startY = 70; // Posición inicial para la tabla
        doc.text('Asignaturas cursadas:', 10, startY);
        startY += 10;

        // Crea la tabla de asignaturas cursadas
        doc.autoTable({
            startY: startY,
            head: [['Nombre Asignatura', 'Resultado', 'Grado Asignatura', 'Nombre Semestre']],
            body: inscripcionesAsignaturas.map(asignatura => [asignatura.nombreAsignatura, asignatura.resultado, asignatura.gradoAsignatura, asignatura.nombreSemestre]),
            theme: 'grid'
        });

        // Añade la lista de exámenes inscritos
        startY = doc.autoTable.previous.finalY + 10; // Posición inicial para la siguiente tabla
        doc.text('Exámenes inscritos:', 10, startY);
        startY += 10;

        // Crea la tabla de exámenes inscritos
        doc.autoTable({
            startY: startY,
            head: [['Nombre Examen', 'Resultado', 'Grado Asignatura', 'Nombre Semestre']],
            body: inscripcionesExamenes.map(examen => [examen.nombreExamen, examen.resultado, examen.gradoAsignatura, examen.nombreSemestre]),
            theme: 'grid'
        });

        // Descarga el documento PDF
    doc.save('escolaridad.pdf');*/

    console.info(data);
    }

    return {
        GenerarPdfEscolaridad
    };
}
