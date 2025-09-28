// src/pages/AdminLayout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("Complaints");

  

  return (
    <div className="flex mt-18 fixed min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white border-r shadow-md hidden md:flex flex-col">

        <nav className="flex flex-col p-4 text-white space-y-2">
          <Link to="/admin" className="relative group w-full text-left px-4 py-3 rounded-md transition-colors">
            <span className="absolute z-1 top-0 left-0 h-full w-0 rounded-lg group-hover:w-full bg-gradient-to-r from-sky-400 to-blue-700 duration-300 transition-all"></span>
            <span className="relative z-10">Dashboard</span>
          </Link>
          <Link to="/complaints" className="relative group w-full text-left px-4 py-3 rounded-md transition-colors">
            <span className="absolute z-1 top-0 left-0 h-full w-0 rounded-lg group-hover:w-full bg-gradient-to-r from-pink-700 to-purple-700 duration-300 transition-all"></span>
            <span className="relative z-10">Complaints</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}

    </div>
  );
};

export default AdminLayout;
