import React from 'react'
import { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminSidebar'


const Dashboard = () => {
    const [totalComplaints, setTotalComplaints] = useState([])
    const [complaints, setComplaints] = useState([])

    // Fetch and set only the 3 most recent complaints
    const fetchRecentComplaints = async () => {
        const res = await fetch("http://localhost:3000/issue/get");
        const data = await res.json();
        // Sort by createdAt descending, then take first 3
        setTotalComplaints(data.issues||[]);
        const sorted = data.issues
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
        setComplaints(sorted);
    };

    useEffect(() => {
        fetchRecentComplaints();
    }, [])

    let total = totalComplaints.length;
    let pending = totalComplaints.filter(e => e.status == "pending").length;
    let working = totalComplaints.filter(e => e.status == "working").length;
    let solved = totalComplaints.filter(e => e.status == "solved").length;

    const recentComplaints = complaints
        .slice() // make a copy
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);




    return (
        <div className='flex max-h-full bg-gradient-to-br from-gray-100 via-white to-blue-50 min-h-screen'>
            <div className='w-[25%]'>
                <AdminLayout />
            </div>
            <div className="p-8 bg-gray-50 w-full mt-17 min-h-screen">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-green-300 via-green-100 to-green-50 rounded-lg shadow p-6 flex flex-col">
                        <span className="text-gray-700 text-sm">Total Complaints</span>
                        <span className="text-3xl font-bold">{total}</span>
                        <span className="text-xs text-green-700 mt-1">+12% from last month</span>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-300 via-yellow-100 to-yellow-50 rounded-lg shadow p-6 flex flex-col">
                        <span className="text-gray-700 text-sm">Pending</span>
                        <span className="text-3xl font-bold">{pending}</span>
                        <span className="text-xs text-yellow-700 mt-1">Awaiting assignment</span>
                    </div>
                    <div className="bg-gradient-to-br from-blue-300 via-blue-100 to-blue-50 rounded-lg shadow p-6 flex flex-col">
                        <span className="text-gray-700 text-sm">In Progress</span>
                        <span className="text-3xl font-bold">{working}</span>
                        <span className="text-xs text-blue-700 mt-1">Being worked on</span>
                    </div>
                    <div className="bg-gradient-to-br from-purple-300 via-purple-100 to-purple-50 rounded-lg shadow p-6 flex flex-col">
                        <span className="text-gray-700 text-sm">Resolved</span>
                        <span className="text-3xl font-bold">{solved}</span>
                        <span className="text-xs text-purple-700 mt-1">Uptill now</span>
                    </div>
                </div>


                {/* Recent Complaints */}
                <div className="bg-white rounded-lg shadow p-6 mt-8">
                    <h2 className="text-2xl font-bold mb-6">Recent Complaints</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-100 via-purple-100 to-green-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-semibold w-[25%] border-l-2  text-gray-600">Title</th>
                                    <th className="px-4 py-2 text-center text-xs font-semibold w-[20%] border-l-2  text-gray-600">Location</th>
                                    <th className="px-4 py-2 text-center text-xs font-semibold w-[10%] border-l-2  text-gray-600">Status</th>
                                    <th className="px-4 py-2 text-center text-xs font-semibold w-[20%] border-l-2 border-r-2  text-gray-600">Reported By</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {recentComplaints.slice(0, 5).map((c, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 ">
                                        <td className="px-4 py-3 font-medium ">{c.type.charAt(0).toUpperCase() + c.type.slice(1)} Problem</td>
                                        <td className="px-4 py-3 flex text-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-1 text-center text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"></path></svg>
                                            <a
                                                href={`https://www.google.com/maps?q=${c.latitude},${c.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-center text-blue-600 w-full hover:underline"
                                            >
                                                View on Google Maps
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {c.status === "pending" && (
                                                <span className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">Pending</span>
                                            )}
                                            {c.status === "working" && (
                                                <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full text-xs font-semibold">In Progress</span>
                                            )}
                                            {c.status === "solved" && (
                                                <span className="bg-green-200 text-green-900 px-2 py-1 rounded-full text-xs font-semibold">Resolved</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500 text-center">{c.userId?.name || "Unknown"}</td>

                                    </tr>
                                ))}
                                {complaints.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-6 text-center text-gray-400">No complaints found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Dashboard
