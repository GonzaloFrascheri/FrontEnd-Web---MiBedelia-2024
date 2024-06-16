'use client';
import jsPDF from "jspdf";
import 'jspdf-autotable';

export function IGenerarPdfEscolaridad(){

    const GenerarPdfEscolaridad = (data) => {
        const { nombreEstudiante, cedula, carrera, fecha, inscripcionesAsignaturas, inscripcionesExamenes, logo } = data;

        const doc = new jsPDF();

        // Configuración del logo
        const imgWidth = 25;
        const imgHeight = 25;
        const imgX = doc.internal.pageSize.getWidth() - imgWidth - 10;
        const imgY = 10;

        doc.addImage(logo, 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Título y subtítulo
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Sistema de gestión online de cursos y escolaridades', 10, imgY + 10);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('FIng - UDELAR - CETP - Proyecto 2024', 10, imgY + 20);

        // Título principal
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 255);
        doc.text('Escolaridad', 105, imgY + imgHeight + 10, null, null, 'center');

        // Añadir subrayado al título
        const textWidth = doc.getTextWidth('Acta de Examen');
        const startX = 105 - textWidth / 2;
        doc.setDrawColor(0, 0, 255); // Color azul
        doc.line(startX, imgY + imgHeight + 12, startX + textWidth, imgY + imgHeight + 12); // Línea subrayada

        doc.setFontSize(12);
        // Información del encabezado en forma de tabla
        doc.autoTable({
            startY: imgY + imgHeight + 20,
            head: [['Nombre del estudiante', 'Cédula', 'Carrera', 'Fecha de emisión']],
            body: [[nombreEstudiante, cedula, carrera, fecha]],
            theme: 'grid',
            styles: { halign: 'center' },
        });


        let currentY = imgY + imgHeight + 30; // Ajuste de la posición Y

        // Actualiza currentY para la siguiente sección
        currentY = doc.autoTable.previous.finalY + 10;

        // Lista de asignaturas cursadas
        doc.setFontSize(16);
        doc.text('Asignaturas cursadas:', 10, currentY);
        currentY += 10;

        doc.setFontSize(12);
        // Tabla de asignaturas cursadas
        doc.autoTable({
            startY: currentY,
            head: [['Nombre Asignatura', 'Resultado', 'Nombre Semestre']],
            body: inscripcionesAsignaturas.map(asignatura => [asignatura.nombreAsignatura, asignatura.resultado, asignatura.nombreSemestre]),
            theme: 'grid',
            styles: { halign: 'center' },
        });

        // Actualiza currentY para la siguiente sección
        currentY = doc.autoTable.previous.finalY + 10;

        // Lista de exámenes inscritos
        doc.setFontSize(16);
        doc.text('Exámenes inscriptos:', 10, currentY);
        currentY += 10;

        doc.setFontSize(12);

        if (inscripcionesExamenes.length === 0) {
            doc.text('No hay exámenes inscriptos.', 10, currentY);
        } else {
            // Tabla de exámenes inscritos
            doc.autoTable({
                startY: currentY,
                head: [['Nombre Examen', 'Resultado', 'Nombre Semestre']],
                body: inscripcionesExamenes.map(examen => [examen.nombreExamen, examen.resultado, examen.nombreSemestre]),
                theme: 'grid',
                styles: { halign: 'center' },
            });
        }

        // Descarga el documento PDF
        doc.save('escolaridad.pdf');
    }

    return {
        GenerarPdfEscolaridad
    };
}
