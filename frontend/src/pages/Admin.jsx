// src/pages/AdminDashboard.jsx
import React from "react";
import AdminLayout from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex mt-18">
    <AdminLayout/>
    <div className="min-h-screen w-full bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Filter Buttons */}
      <div className="mb-6 flex w-full flex-wrap gap-3">
        {["All", "Pending", "Working", "Solved"].map((status, index) => (
          <button
            key={index}
            className={`px-5 py-2 rounded-full shadow-sm border border-gray-300 
              ${
                status === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600">Photo</th>
              <th className="p-4 font-semibold text-gray-600">Type</th>
              <th className="p-4 font-semibold text-gray-600">Location</th>
              <th className="p-4 font-semibold text-gray-600">Date</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row Example */}
            {[
              {
                photo: "https://via.placeholder.com/80",
                type: "Drain Blockage",
                location: "Main Street",
                date: "12/08/2025",
                status: "Pending",
              },
              {
                photo: "https://via.placeholder.com/80",
                type: "Sewage Overflow",
                location: "Park Avenue",
                date: "10/08/2025",
                status: "Working",
              },
              {
                photo: "https://via.placeholder.com/80",
                type: "Leakage Issue",
                location: "Market Road",
                date: "08/08/2025",
                status: "Solved",
              },
            ].map((c, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 border-b transition-colors"
              >
                <td className="p-4">
                  <img
                    src={c.photo}
                    alt="Complaint"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                </td>
                <td className="p-4 text-gray-700">{c.type}</td>
                <td className="p-4 text-gray-700">{c.location}</td>
                <td className="p-4 text-gray-700">{c.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      c.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : c.status === "Working"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4">
                  <select className="bg-white border border-gray-300 text-gray-700 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400">
                    <option>Pending</option>
                    <option>Working</option>
                    <option>Solved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
