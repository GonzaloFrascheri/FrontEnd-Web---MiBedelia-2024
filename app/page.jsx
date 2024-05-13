
import NavPublico from './componentes/navs/nav-publico.jsx';
import Index from './componentes/main/index.jsx';
export const metadata = {
  title: "Inicio",
  description: "Index page.",
};
function HomePage() {
  return (
    <>
      <NavPublico />
    
      <Index />
    </>
  )
}

export default HomePage;
