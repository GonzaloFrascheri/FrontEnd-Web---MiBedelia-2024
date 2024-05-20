'use client';
import React from "react";
import jsPDF from "jspdf";

export function GenerarPdfActaExamen() {

    const PDFGenerador = (tmp) => {            
        const { examen, docente, fecha, hora, aula, estudiantes } = tmp;

        const doc = new jsPDF();

        doc.text(`Acta de Examen`, 105, 10, "center");
        doc.text(`Examen: ${examen.nombre}`, 10, 20);
        doc.text(`Docente: ${docente.nombre} ${docente.apellido}`, 10, 30);
        doc.text(`Fecha: ${fecha}`, 10, 40);
        doc.text(`Hora: ${hora}`, 10, 50);
        doc.text(`Aula: ${aula}`, 10, 60);
        doc.text(`Estudiantes:`, 10, 70);
        estudiantes.forEach((estudiante, index) => {
            doc.text(`${index + 1}. ${estudiante.nombre} ${estudiante.apellido}`, 10, 80 + index * 10);
        });

        doc.save("acta-examen.pdf");
    };

    return {
        PDFGenerador
    };

}