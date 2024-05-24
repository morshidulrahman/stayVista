import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashBoardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
