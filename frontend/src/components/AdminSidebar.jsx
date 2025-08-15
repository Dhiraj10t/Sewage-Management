// src/pages/AdminLayout.jsx
import React, { useState } from "react";

const AdminLayout = () => {
  const [activePage, setActivePage] = useState("Complaints");

  const menuItems = [
    { name: "Complaints" },
    { name: "Create Tender" },
    { name: "View Tenders" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md hidden md:flex flex-col">
        <div className="p-4 text-2xl font-bold text-blue-600 border-b">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activePage === item.name
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      
    </div>
  );
};

export default AdminLayout;
