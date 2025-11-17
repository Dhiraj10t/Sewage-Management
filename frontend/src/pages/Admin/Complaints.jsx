import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminSidebar";

const statusColors = {
    pending: "bg-yellow-400 text-white",
    working: "bg-blue-500 text-white",
    solved: "bg-green-600 text-white",
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

    const handleclick = async (status) => {
        console.log("status", status, openModalId);

        const res = await fetch(`http://localhost:3000/issue/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status, id: openModalId })
        })
        const data = await res.json();
        console.log(data);
        fetchComplaints();
        setOpenModalId(null);
    }

    const handledelete = async (id) => {
        const res = await fetch(`http://localhost:3000/issue/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
        const data = await res.json();
        console.log(data);
        fetchComplaints();
        setOpenModalId(null);
    }
    

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
        <div className="flex max-h-full bg-gradient-to-br from-gray-100 via-white to-blue-50 min-h-screen"> 
            <div className="w-[20%]">
                <AdminLayout />
            </div>

            <div className="p-6 w-[80%] mt-17 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Complaints</h1>
                        <p className="text-gray-600">Manage and track all sewage-related complaints</p>
                    </div>
                    <button  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
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
                            <option>working</option>
                            <option>solved</option>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handledelete(c._id)}
                                            className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                                <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
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
                                            <div className="flex gap-2">
                                                <button onClick={(e) => handleclick(e.target.name)} name="pending" className={`${c.status === "pending" ? "hidden" : ""} mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition`}>
                                                    Pending
                                                </button>
                                                <button onClick={(e) => handleclick(e.target.name)} name="working" className={`${c.status === "working" ? "hidden" : ""} mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition`}>
                                                    Working
                                                </button>
                                                <button onClick={(e) => handleclick(e.target.name)} name="solved" className={`${c.status === "solved" ? "hidden" : ""} mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition`}>
                                                    Solved
                                                </button>
                                            </div>


                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}
