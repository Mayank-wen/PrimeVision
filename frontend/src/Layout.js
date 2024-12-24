import React from "react";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
