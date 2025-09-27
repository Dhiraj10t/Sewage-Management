import React, { useState,useEffect } from "react";
import AdminLayout from "../components/AdminSidebar";
import { motion } from "framer-motion";



const AdminDashboard = () => {
  const [filter, setFilter] = useState("All");
  const [complaints, setComplaints] = useState([])

  
  
  const filteredComplaints =
    filter === "All" ? complaints : complaints.filter((c) => c.status === filter);

  const fetchComplaints=async()=>{
    const res= await fetch("http://localhost:3000/issue/get")
    const data= await res.json();
    console.log(data)
    setComplaints(data.issues)
    console.log("1",complaints)
  }

  useEffect(() => {
    fetchComplaints();
    
  }, [])
  
  
  

  return (
    <div className="flex mt-18">
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Filter Buttons */}
        <motion.div
          className="mb-6 flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {["All", "Pending", "Working", "Solved"].map((status, index) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={index}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-full border font-semibold shadow-md transition-all duration-300 ${
                filter === status
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status}
            </motion.button>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 via-white to-blue-100 border-b">
                {["Photo", "Type", "Location", "Date", "Status", "Actions"].map(
                  (head, i) => (
                    <th
                      key={i}
                      className="p-4 font-semibold text-gray-600 w-[17%] text-sm uppercase tracking-wide"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c, i) => (
                <motion.tr
                  key={i}
                  className="hover:bg-blue-50/40 border-b transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="p-4">
                    <img
                      src={c.photo}
                      alt="Complaint"
                      className="w-16 h-16 object-cover rounded-xl border shadow-sm"
                    />
                  </td>
                  <td className="p-4 text-gray-700 font-medium">{c.type}</td>
                  <td className="p-4 text-gray-700">
                    <a
                      href={`https://www.google.com/maps?q=${c.latitude},${c.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      🌐 View on Google Maps
                    </a>
                  </td>
                  <td className="p-4 text-gray-700">{c.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
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
                    <select className="bg-white border border-gray-300 text-gray-700 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400">
                      <option>Pending</option>
                      <option>Working</option>
                      <option>Solved</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;