import React from "react";

export const metadata = {
  title: "Dashboard privado",
  description: "Zona privada.",
};
 
export default function PrivadoLayout({ children }) {

  return (
    <html lang="es">
      <body className="nav-fixed sidenav-toggled">
        {children}
      </body>
    </html>
  );
}
  