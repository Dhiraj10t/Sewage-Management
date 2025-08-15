import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[20%] h-screen sticky bg-gray-900 text-white flex flex-col py-6 px-3">
      {/* Sidebar Header */}
      <h1 className="text-2xl font-bold mb-8 px-2">My App</h1>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        <Link
          to="/user"
          className="relative overflow-hidden flex items-center gap-2 px-4 py-3 rounded-lg group"
        >
          <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
          <svg
            className="relative z-10 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Your original SVG path */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
          </svg>
          <span className="relative z-10">Dashboard</span>
        </Link>

        {/* Complaints */}
        <Link
          to="/addComplaint"
          className="relative overflow-hidden flex items-center gap-2 px-4 py-3 rounded-lg group"
        >
          <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          <svg
            className="relative z-10 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Your original SVG path */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 16v-6a9 9 0 10-18 0v6l-2 2v1h22v-1l-2-2z" />
          </svg>
          <span className="relative z-10">Add Complaints</span>
        </Link>

        {/* Settings */}
        <Link
          to="/myComplaint"
          className="relative overflow-hidden flex items-center gap-2 px-4 py-3 rounded-lg group"
        >
          <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
          <svg
            className="relative z-10 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {/* Your original SVG path */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l.334 1.028a1 1 0 00.95.69h1.084a1 1 0 01.95 1.316l-.334 1.027a1 1 0 00.29.954l.77.77a1 1 0 010 1.415l-.77.77a1 1 0 00-.29.954l.334 1.027a1 1 0 01-.95 1.316h-1.084a1 1 0 00-.95.69l-.334 1.028a1 1 0 01-1.902 0l-.334-1.028a1 1 0 00-.95-.69H8.681a1 1 0 01-.95-1.316l.334-1.027a1 1 0 00-.29-.954l-.77-.77a1 1 0 010-1.415l.77-.77a1 1 0 00.29-.954l-.334-1.027A1 1 0 018.68 4.645h1.084a1 1 0 00.95-.69l.334-1.028z" />
          </svg>
          <span className="relative z-10">Complaints</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
