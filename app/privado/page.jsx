"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../componentes/siders/sidebar.jsx";
import MainDashboard from "../componentes/main/dashboard.jsx";
import NavPrivado from '../componentes/navs/nav-privado.jsx';
import { decodeJwt} from "jose";

function PrivadoPage() {
  const router = useRouter();
  const [data, setData] = useState('');

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
      setIsSidebarToggled(!isSidebarToggled);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("tokenFront");
    if (!token) {
      router.push("/");
    } else {
      setData(decodeJwt (token));
    }
  }, []);

  return (
    <body className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}>
      <NavPrivado data={data} isSidebarToggled={isSidebarToggled} toggleSidebar={toggleSidebar} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar isSidebarToggled={isSidebarToggled} />
        </div>
        <div id="layoutSidenav_content">
          <MainDashboard data={data} />
        </div>
      </div>
    </body>
  );

}
  
export default PrivadoPage;
