function HeaderPagePrivado({ breadcrumbs }) {
    let path = '';  // Variable para ir acumulando la ruta
    return (        
        <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div class="container-xl px-4">
                <div class="page-header-content pt-4">
                    <nav class="mt-4 rounded" aria-label="breadcrumb">
                        <ol className="breadcrumb px-3 py-2 rounded mb-0">
                            {breadcrumbs.map((crumb, index) => {
                            // Acumular la ruta
                            path += `/${crumb}`;

                            return (
                                <li
                                key={index}
                                className={`breadcrumb-item${index === breadcrumbs.length - 1 ? ' active' : ''}`}
                                aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                                >
                                {(index === 0 || index === breadcrumbs.length - 1) ? (
                                    <a href={path}>{crumb}</a>
                                ) : (
                                    crumb
                                )}
                                </li>
                            );
                            })}
                        </ol>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderPagePrivado;