'use client';
import jsPDF from "jspdf";
import 'jspdf-autotable';

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
        
        // Información del encabezado en forma de tabla
        doc.autoTable({
          startY: imgY + imgHeight + 20,
          head: [['Asignatura', 'Docente', 'Semestre', 'Año']],
          body: [[asignatura, docente.nombre, semestre, año]],
          theme: 'grid',
          headStyles: { fillColor: [200, 200, 200] }, // color de fondo para los títulos
          styles: { halign: 'center' },
        });
      
        // Posicionar la tabla de estudiantes después de la tabla de encabezado
        const startY = doc.autoTable.previous.finalY + 10;

        if (estudiantes.length === 0) {
            // Añadir mensaje si no hay estudiantes
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text('No hay estudiantes registrados para esta asignatura.', 14, startY);
        } else {
            // Crear la tabla de estudiantes
            doc.autoTable({
                startY: startY, // posición Y inicial para la tabla
                head: [['#', 'Nombre', 'Apellido', 'CI', 'Teléfono', 'Email']], // títulos de las columnas
                body: estudiantes.map((estudiante, index) => [
                    index + 1,
                    estudiante.nombre,
                    estudiante.apellido,
                    estudiante.ci,
                    estudiante.telefono,
                    estudiante.email,
                ]), // datos de los estudiantes
                styles: { fillColor: [255, 255, 255] }, // color de fondo blanco por defecto
                alternateRowStyles: { fillColor: [240, 240, 240] }, // color de fondo alterno
                headStyles: { fillColor: [200, 200, 200] }, // color de fondo para los títulos
            });
        }
      
        // Mostrar el PDF en una nueva pestaña del navegador
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);

    };

    return {
        PDFGenerador
    };

}