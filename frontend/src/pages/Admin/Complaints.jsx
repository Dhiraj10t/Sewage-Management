import React, { useState, useEffect } from "react";

const statusColors = {
    pending: "bg-yellow-400 text-white",
    "In Progress": "bg-blue-500 text-white",
    Resolved: "bg-green-600 text-white",
    Closed: "bg-gray-400 text-white",
};

export default function ComplaintsManagement() {
    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [openModalId, setOpenModalId] = useState(null); // track which complaint modal is open

    const fetchComplaints = async () => {
        const res = await fetch("http://localhost:3000/issue/get");
        const data = await res.json();
        console.log(data.issues)
        setComplaints(data.issues);
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    // Filter and sort complaints
    const filteredComplaints = complaints
        .filter((c) => {
            if (statusFilter !== "All Statuses" && c.status !== statusFilter) return false;
            if (search.trim()) {
                const s = search.trim().toLowerCase();
                return (
                    c.type?.toLowerCase().includes(s) ||
                    (c.adress?.toLowerCase() || "").includes(s) ||
                    c.userId?.name?.toLowerCase().includes(s)
                );
            }
            return true;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="p-6 mt-17 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Complaints</h1>
                    <p className="text-gray-600">Manage and track all sewage-related complaints</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                    + New Complaint
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
                <h2 className="font-semibold mb-3">Filters</h2>
                <div className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Search complaints, locations, or complainants..."
                        className="border px-3 py-2 rounded-lg flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="border px-3 py-2 rounded-lg"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Statuses</option>
                        <option>pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gradient-to-r from-sky-600 via-purple-600 to-green-600 text-white">
                        <tr>
                            <th className="p-3 font-semibold">ID</th>
                            <th className="p-3 font-semibold">Title</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold">Location</th>
                            <th className="p-3 font-semibold">Complainant</th>
                            <th className="p-3 font-semibold">Created</th>
                            <th className="p-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComplaints.map((c, idx) => (
                            <tr
                                key={c._id}
                                className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50 transition" : "bg-white hover:bg-blue-50 transition"}
                            >
                                <td className="p-3">{c._id.slice(-6)}</td>
                                <td className="p-3">
                                    <div className="font-semibold">{c.type}</div>
                                    <div className="text-gray-500 text-sm">{c.description}</div>
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[c.status]}`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-3 text-gray-600">
                                    <a
                                        href={`https://www.google.com/maps?q=${c.latitude},${c.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        🌐 View on Google Maps
                                    </a>
                                </td>
                                <td className="p-3">
                                    <div>{c.userId?.name || "Unknown"}</div>
                                    <div className="text-sm text-gray-500">{c.userId?.phoneNo || "N/A"}</div>
                                </td>
                                <td className="p-3 text-gray-600">
                                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => setOpenModalId(c._id)}
                                        className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
                                    >
                                        👁️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {openModalId && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-start pt-20 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl space-y-4 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                            onClick={() => setOpenModalId(null)}
                        >
                            ✖
                        </button>
                        {(() => {
                            const c = complaints.find((i) => i._id === openModalId);
                            if (!c) return null;
                            return (
                                <>
                                    <div className=" overflow-auto">
                                        <div className="flex justify-between items-center">
                                            <span className={`px-3 py-1 rounded text-xs ${statusColors[c.status]}`}>{c.status}</span>
                                        </div>
                                        <h2 className="text-xl font-semibold">{c.type}</h2>
                                        <p className="text-gray-600">{c.description || "No description provided"}</p>
                                        <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
                                            {c.photo ? (
                                                <img src={c.photo} alt="Evidence" className="object-cover w-full h-full" />
                                            ) : (
                                                <span className="text-gray-400">No image provided</span>
                                            )}
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Location</h3>
                                                <p className="text-gray-600 text-sm">{c.adress}</p>
                                                <p className="text-gray-400 text-xs">
                                                    Coordinates: {c.latitude}, {c.longitude}
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Complainant</h3>
                                                <p className="text-gray-600 text-sm">{c.userId?.name}</p>
                                                <p className="text-gray-600 text-sm">{c.userId?.phoneNo}</p>
                                            </div>
                                        </div>


                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}
