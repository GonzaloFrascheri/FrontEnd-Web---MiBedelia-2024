import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

export default function VerPerfilPage({ data }) {

    return (
        <main>
            <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                <div className="container-xl px-4">
                    <div className="page-header-content pt-4">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-auto mt-4">
                                <h1 className="page-header-title">
                                    <div className="page-header-icon">
                                        <FontAwesomeIcon icon={faDashboard} />
                                    </div>
                                    Dashboard
                                </h1>
                                <div className="page-header-subtitle">Bienvenido {data.sub}.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </main>
    );
}