import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MyComplaints = () => {
  const navigate=useNavigate()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    working: "bg-blue-100 text-blue-700 border-blue-300",
    solved: "bg-green-100 text-green-700 border-green-300"
  }

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:3000/issue/get")
        const result = await res.json()
        setComplaints(result.issues)
      } catch (error) {
        console.error("Error fetching complaints:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-[80%] not-sm:w-full mt-18 p-6 bg-white overflow-y-scroll">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-extrabold text-gray-900 mb-2"
        >
          My Complaints
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-gray-600 mb-6"
        >
          Track all complaints you've submitted.
        </motion.p>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        ) : complaints.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {complaints.map((c) => (
              <motion.div
                key={c._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md p-5 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">
                    Submitted on: {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor[c.status]}`}>
                    {c.status.toUpperCase()}
                  </span>
                </div>

                {/* Type + Description */}
                <h2 className="text-xl font-bold text-gray-800">{c.type}</h2>
                <p className="text-gray-700 mt-1">{c.description}</p>

                {/* Landmark */}
                {c.landmark && (
                  <p className="text-sm text-gray-500 mt-1">📍 Landmark: {c.landmark}</p>
                )}

                {/* Location */}
                {c.latitude && c.longitude && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      📌 <strong>Location:</strong> {c.latitude}, {c.longitude}
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${c.latitude},${c.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      🌐 View on Google Maps
                    </a>
                  </div>
                )}

                {/* Photos */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Before</p>
                    <img
                      src={c.photoBefore}
                      alt="Before"
                      className="rounded-lg w-full h-32 object-cover border"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">After</p>
                    {c.status === "solved" && c.photoAfter ? (
                      <img
                        src={c.photoAfter}
                        alt="After"
                        className="rounded-lg w-full h-32 object-cover border"
                      />
                    ) : (
                      <div className="w-full h-32 border rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
                        {c.status === "pending" ? "Pending" : "Working"}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-10"
          >
            <p className="text-gray-600 mb-4">You haven't submitted any complaints yet.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => window.location.href = '/add-complaint'}
            >
              Submit Your First Complaint
            </button>
          </motion.div>
        )}

        {/* Floating Add Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/addcomplaint")}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition duration-300"
        >
          ➕ Add Complaint
        </motion.button>
      </div>
    </div>
  )
}

export default MyComplaints
