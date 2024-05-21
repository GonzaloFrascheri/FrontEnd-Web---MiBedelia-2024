"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import MainDashboard from "@/app/componentes/main/dashboard.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import { decodeJwt} from "jose";
import storage from "@/utils/storage";

function PrivadoPage() {
  const router = useRouter();
  const [data, setData] = useState('');

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
      setIsSidebarToggled(!isSidebarToggled);
  };

  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push("/");
    } else {
      const decodedData = decodeJwt(token);
      setData(decodedData);
    }
  }, [router]);

  useEffect(() => {
    if (data) {
      console.log(data.role);
    }
  }, [data]);

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
