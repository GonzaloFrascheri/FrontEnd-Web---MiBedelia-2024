import {GenerarExcellActaFinDeCurso} from '@/app/componentes/generadorEXCELL/actaFinDeCurso.jsx';

export default function FinDeCursoRegistrarExamen({
    handleSubmit,
    formData,
    isFormValid,
    FinDeCursoDto
}) {

    const { EXCELLGenerador } = GenerarExcellActaFinDeCurso();

    const generarExcell = () => {
        if (!FinDeCursoDto) {
            console.error('FinDeCursoDto es null');
            setError(true);
        } else {
            const fecha = new Date(FinDeCursoDto.fechaExamen);
            const datosPrueba = {
                asignatura: FinDeCursoDto.nombreAsignatura,
                semestre: FinDeCursoDto.semestre,
                //fechaExamen: fecha.toISOString().split('T')[0],
                año: FinDeCursoDto.anioLectivo,
                docente: {
                    nombre: FinDeCursoDto.nombreDocente,
                },
                estudiantes: 
                    FinDeCursoDto.estudiantes,
                logo: '' // Imagen en base64
            };
            EXCELLGenerador(datosPrueba);
            }
    }

    return (   
        <div className="container-xl px-4">
            <div className="card">
                <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header justify-content-center">
                        <h3 className="fw-light">
                            Generar Acta de Examen para la asignatura {formData?.nombreAsignatura || ""}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                        <div className="card-footer  d-flex align-items-center justify-content-between">
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={generarExcell}
                            >
                                Descargar Planilla en Excell
                            </button>
                            <button
                                disabled={!isFormValid()}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Cargar Planilla Excell
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}