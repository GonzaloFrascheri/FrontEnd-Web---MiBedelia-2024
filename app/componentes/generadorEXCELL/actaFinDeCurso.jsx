import React from 'react';
import * as XLSX from 'xlsx';

export function GenerarExcellActaFinDeCurso() {

    const EXCELLGenerador = (tmp) => {

        const { asignatura, semestre, año, docente, estudiantes, logo } = tmp;
    
        // Crear una nueva hoja de cálculo
        const wb = XLSX.utils.book_new();
    
        // Crear el contenido de la hoja
        const ws_data = [
            ["Sistema de gestión online de cursos y escolaridades"],
            ["FIng - UDELAR - CETP - Proyecto 2024"],
            [],
            ["Acta de Fin de Curso"],
            [],
            ["Asignatura", asignatura],
            ["Docente", docente.nombre],
            ["Semestre", semestre],
            ["Año", año],
            [],
            ["* Las notas posibles son: Exonerado, A examen, Recursa"],
            []
        ];
    
        if (estudiantes.length === 0) {
            ws_data.push(["No hay estudiantes registrados para esta asignatura."]);
        } else {
            // Añadir encabezados de la tabla de estudiantes
            ws_data.push(["#", "Nombre", "Apellido", "CI", "Teléfono", "Email", "Nota"]);
    
            // Añadir datos de los estudiantes
            estudiantes.forEach((estudiante, index) => {
                ws_data.push([
                    index + 1,
                    estudiante.nombre,
                    estudiante.apellido,
                    estudiante.ci,
                    estudiante.telefono,
                    estudiante.email,
                    '' // nota vacía: Exonerado, A examen, Recursa
                ]);
            });
        }
    
        // Convertir los datos a una hoja de trabajo
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
        // Agregar la hoja de trabajo al libro de trabajo
        XLSX.utils.book_append_sheet(wb, ws, "Acta de Fin de Curso");
    
        // Generar el archivo Excel
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    
        // Función para convertir la salida del libro de trabajo a un formato descargable
        function s2ab(s) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    
        // Crear un blob a partir de los datos binarios
        const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    
        // Crear un enlace para descargar el archivo
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Acta_Fin_de_Curso.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return { EXCELLGenerador };
}