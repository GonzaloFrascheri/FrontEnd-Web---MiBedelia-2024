"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/app/componentes/siders/sidebar.jsx";
import MainDashboard from "@/app/componentes/main/dashboard.jsx";
import NavPrivado from '@/app/componentes/navs/nav-privado.jsx';
import { userAuthenticationCheck } from "@/utils/auth";
import Footer from '@/app/componentes/main/footer';
import storage from "@/utils/storage";

function PrivadoPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState('');

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
      setIsSidebarToggled(!isSidebarToggled);
  };

  console.log(data);
  console.info("role", storage.getRole());

  useEffect(() => {
    const userData = userAuthenticationCheck(router, pathname);
    setData(userData)
  }, [router, pathname]);

  return (
    <body className={isSidebarToggled ? 'nav-fixed' : 'nav-fixed sidenav-toggled'}>
      <NavPrivado isSidebarToggled={isSidebarToggled} toggleSidebar={toggleSidebar} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar isSidebarToggled={isSidebarToggled} />
        </div>
        <div id="layoutSidenav_content">
          <MainDashboard data={data} />
          <Footer />
        </div>
      </div>
    </body>
  );

}
  
export default PrivadoPage;
