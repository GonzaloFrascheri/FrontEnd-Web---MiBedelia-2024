'use client';
import jsPDF from "jspdf";

export function GenerarPdfActaFinDeCurso() {


    const PDFGenerador = (tmp) => {

        const { asignatura, semestre, año, docente, estudiantes, logo } = tmp;

        const doc = new jsPDF();

        // Cargar y agregar el logo
        const imgWidth = 50; // Ancho deseado para el logo
        const imgHeight = 50; // Alto deseado para el logo
        const imgX = (doc.internal.pageSize.getWidth() - imgWidth) / 2; // Centrar horizontalmente
        const imgY = 10; // Posición vertical del logo

        doc.addImage(logo, 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Título en fuente más grande y en negrita
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('Acta de Fin de Curso', 105, imgY + imgHeight + 10, null, null, 'center');

        // Subtítulos en negrita
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Asignatura: ${asignatura}`, 50, imgY + imgHeight + 20, null, null, 'center');
        doc.text(`Docente: ${docente.nombre} ${docente.apellido}`, 120, imgY + imgHeight + 20);

        // Detalles de la Asignatura con fuente normal
        doc.setFont('helvetica', 'normal');
        doc.text(`Semestre: ${semestre}`, 10, imgY + imgHeight + 30);
        doc.text(`Año: ${año}`, 145, imgY + imgHeight + 30);

        // Subtítulo para la lista de estudiantes en negrita
        doc.setFont('helvetica', 'bold');
        doc.text(`## - Estudiantes:`, 10, imgY + imgHeight + 40);

        // Lista de estudiantes con fuente normal
        doc.setFont('helvetica', 'normal');
        estudiantes.forEach((estudiante, index) => {
            doc.text(`${index + 1} - ${estudiante.nombre} ${estudiante.apellido}`, 10, imgY + imgHeight + 50 + index * 10);
        });

        doc.save("acta-FinDeCurso.pdf");

    };

    return {
        PDFGenerador
    };

}