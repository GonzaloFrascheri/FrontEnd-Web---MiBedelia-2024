'use client';
import jsPDF from "jspdf";
import 'jspdf-autotable';

export function GenerarPdfActaFinDeCurso() {


    const PDFGenerador = (tmp) => {

        const { asignatura, semestre, año, docente, estudiantes, logo } = tmp;

        const doc = new jsPDF();
      
        // Cargar y agregar el logo
        const imgWidth = 25; // Ancho deseado para el logo
        const imgHeight = 25; // Alto deseado para el logo
        const imgX = doc.internal.pageSize.getWidth() - imgWidth - 10; // Posición a la derecha
        const imgY = 10; // Posición vertical del logo

        doc.addImage(logo, 'PNG', imgX, imgY, imgWidth, imgHeight);

        // Título y subtítulo en la parte izquierda
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Sistema de gestión online de cursos y escolaridades', 10, imgY + 10);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('FIng - UDELAR - CETP - Proyecto 2024', 10, imgY + 20);

        // Título principal en fuente más grande y en negrita, color azul y subrayado
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 255); // Color azul
        doc.text('Acta de Fin de Curso', 105, imgY + imgHeight + 10, null, null, 'center');

        // Añadir subrayado al título
        const textWidth = doc.getTextWidth('Acta de Fin de Curso');
        const startX = 105 - textWidth / 2;
        doc.setDrawColor(0, 0, 255); // Color azul
        doc.line(startX, imgY + imgHeight + 12, startX + textWidth, imgY + imgHeight + 12); // Línea subrayada

        // Subtítulos en negrita
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0); // Color negro para los subtítulos
        
        // Información del encabezado en forma de tabla
        doc.autoTable({
          startY: imgY + imgHeight + 20,
          head: [['Asignatura', 'Docente', 'Semestre', 'Año']],
          body: [[asignatura, docente.nombre, semestre, año]],
          theme: 'grid',
          headStyles: { fillColor: [200, 200, 200] }, // color de fondo para los títulos
          styles: { halign: 'center' },
        });
      
        // Posicionar la leyenda después de la tabla de encabezado
        const legendY = doc.autoTable.previous.finalY + 10;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        const legendText = '* Las notas posibles son: Exonerado, A examen, Recursa';
        const pageWidth = doc.internal.pageSize.getWidth();
        const legendX = pageWidth - doc.getTextWidth(legendText) - 10; // Ajustar al margen derecho con un margen de 10 unidades

        doc.text(legendText, legendX, legendY);
    
        // Posicionar la tabla de estudiantes después de la leyenda
        const startY = legendY + 10;

        if (estudiantes.length === 0) {
            // Añadir mensaje si no hay estudiantes
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text('No hay estudiantes registrados para esta asignatura.', 14, startY);
        } else {
            // Crear la tabla de estudiantes
            doc.autoTable({
                startY: startY, // posición Y inicial para la tabla
                head: [['#', 'Nombre', 'Apellido', 'CI', 'Teléfono', 'Email', 'Nota']], // títulos de las columnas
                body: estudiantes.map((estudiante, index) => [
                    index + 1,
                    estudiante.nombre,
                    estudiante.apellido,
                    estudiante.ci,
                    estudiante.telefono,
                    estudiante.email,
                    '' // nota vacía: Exnonerado, A examen, Recursa
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