import Footer from '@/app/componentes/main/footer';
export default function Index() {

    return (

        <div id="layoutSidenav">
            <div id="layoutSidenav_content">
                <main>
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i data-feather="activity"></i></div>
                                            Bienvenido a
                                        </h1>
                                        <div className="page-header-subtitle">Mi Bedelia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="row">
                            <div className="col-xxl-12 col-xl-12 mb-12">
                                <div className="card h-100">
                                    <div className="card-body h-100 p-5">
                                        <div className="row align-items-center">
                                            <div className="col-xl-12 col-xxl-12">
                                                <div className="text-center text-xl-center text-xxl-center mb-4 mb-xl-0 mb-xxl-4">
                                                    <h1 className="text-primary">Sistema de gestión online de cursos y escolaridades</h1>
                                                </div>
                                            </div>
                                            <div className="col-xl-12 col-xxl-12 text-center">
                                                <img
                                                    alt="logo.png"
                                                    src="img/logo.png"
                                                    className="img-fluid max-width: 26rem"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}