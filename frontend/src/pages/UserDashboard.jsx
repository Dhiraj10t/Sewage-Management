import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const UserDashboard = () => {
    const navigate = useNavigate()
    const [complaints, setComplaints] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await fetch("http://localhost:3000/issue/getsingle",{headers: {"authorization": `Bearer ${localStorage.getItem('token')}`}  })
                const result = await res.json()
                setComplaints(result.issues || [])
            } catch (error) {
                console.error("Error fetching complaints:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchComplaints()
    }, [])

    // Calculate summary numbers
    const totalSubmitted = complaints.length
    const pending = complaints.filter(c => c.status === "pending").length
    const inProgress = complaints.filter(c => c.status === "working").length
    const resolved = complaints.filter(c => c.status === "solved").length

    return (
        <div className="flex max-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 mt-18 w-full p-6 overflow-y-auto">
                {/* Top Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col md:flex-row mb-6 justify-between gap-4 bg-gradient-to-r from-blue-700/10 via-white to-blue-400/10 border border-gray-200 px-8 py-7 rounded-2xl items-center shadow-lg"
                >
                    <div className='space-y-1 flex flex-col md:items-start items-center'>
                        <h1 className="text-2xl font-bold text-blue-900">Welcome back, dhiraj!</h1>
                        <p className="text-gray-600">Here's an overview of your sewage complaint submissions.</p>
                    </div>
                    <button
                        onClick={() => navigate("/addComplaint")}
                        className="flex gap-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 text-base font-semibold"
                    >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                <g id="Edit / Add_Plus">
                                    <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                        </span>
                        <span>Submit New Complaint</span>
                    </button>
                </motion.div>

                {/* Quick Access Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                    <div
                        onClick={() => navigate("/addComplaint")}
                        className="bg-white bg-gradient-to-r from-blue-100/40 via-white to-blue-50 border border-blue-100 py-7 px-7 rounded-2xl flex items-center gap-5 shadow hover:shadow-xl cursor-pointer transition hover:-translate-y-1"
                    >
                        <div className="text-2xl bg-blue-100 p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                <g id="Edit / Add_Plus">
                                    <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-900">Submit Complaint</h3>
                            <p className="text-sm text-gray-600">Report a new sewage issue</p>
                        </div>
                    </div>
                    <div
                        onClick={() => navigate("/myComplaint")}
                        className="bg-white bg-gradient-to-r from-blue-50 via-white to-blue-100/40 border border-blue-100 py-7 px-7 rounded-2xl flex items-center gap-5 shadow hover:shadow-xl cursor-pointer transition hover:-translate-y-1"
                    >
                        <div className="text-2xl bg-blue-100 p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="-0.5 0 25 25" fill="none">
                                <path d="M2 12.32H22" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 18.32H22" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 6.32001H22" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-900">View My Complaints</h3>
                            <p className="text-sm text-gray-600">Track your submitted complaints</p>
                        </div>
                    </div>
                </motion.div>

                {/* Complaint Summary */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-white border border-blue-100 rounded-2xl p-7 mb-8 shadow"
                >
                    <h3 className="text-xl font-bold mb-6 text-blue-900">Your Complaint Summary</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex justify-center items-center text-full p-3 bg-blue-100 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none">
                                    <path d="M2 12.32H22" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 18.32H22" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 6.32001H22" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="font-bold text-blue-700">{loading ? '...' : totalSubmitted}</p>
                            <p className="text-sm text-gray-600">Total Submitted</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="bg-gray-100 rounded-xl p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="font-bold text-blue-700">{loading ? '...' : pending}</p>
                            <p className="text-sm text-gray-600">Pending Review</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="bg-yellow-100 rounded-xl p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3V6M3 12H6M5.63607 5.63604L7.75739 7.75736M5.63604 18.3639L7.75736 16.2426M21 12.0005H18M18.364 5.63639L16.2427 7.75771M11.9998 21.0002V18.0002M18.3639 18.3642L16.2426 16.2429" stroke="#F59E42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className="font-bold text-yellow-700">{loading ? '...' : inProgress}</p>
                            <p className="text-sm text-gray-600">In Progress</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="bg-green-100 rounded-xl p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 117 117" version="1.1">
                                    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                                        <g fillRule="nonzero">
                                            <path d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z" fill="#17AB13" />
                                            <path d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z" fill="#4A4A4A" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <p className="font-bold text-green-700">{loading ? '...' : resolved}</p>
                            <p className="text-sm text-gray-600">Resolved</p>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <div className="bg-white border border-blue-100 rounded-2xl h-[300px] p-7 mb-8 shadow flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-blue-900">Recent Activity</h3>
                    {loading ? (
                        <div className="flex-1 flex items-center justify-center text-gray-400">Loading...</div>
                    ) : complaints.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                            <span className="flex justify-center items-center h-14 w-14 bg-blue-50 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none">
                                    <path d="M2 12.32H22" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 18.32H22" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 6.32001H22" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <p className="text-gray-500">No complaints submitted yet</p>
                            <button
                                onClick={() => navigate("/addComplaint")}
                                className="flex gap-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition-all duration-200 text-base font-semibold"
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                        <g id="Edit / Add_Plus">
                                            <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </span>
                                <span>Submit Your First Complaint</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto">
                            <ul className="space-y-4 pr-2">
                                {complaints
                                    .slice()
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .slice(0, 3)
                                    .map((c) => (
                                        <li key={c._id} className="border-b pb-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-blue-800">{c.type}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    c.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : c.status === "working"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}>
                                                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                                                </span>
                                            </div>
                                            <div className="text-gray-600 text-sm mt-1 truncate">{c.description}</div>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-400">
                                                    {new Date(c.createdAt).toLocaleDateString()}&nbsp;
                                                    <span className="text-[11px] text-gray-400">
                                                        {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                    </span>
                                                </span>
                                                {c.landmark && (
                                                    <span className="text-xs text-gray-500">📍 {c.landmark}</span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default UserDashboard
