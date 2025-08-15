import React, { useState } from "react";

const TenderManagement = () => {
  const [tenders, setTenders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    title: "",
    description: "",
    problem: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTender = () => {
    if (!formData.title || !formData.startDate || !formData.endDate || !formData.problem) return;
    setTenders([...tenders, formData]);
    setFormData({
      startDate: "",
      endDate: "",
      title: "",
      description: "",
      problem: "",
      amount: "",
    });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen mt-17 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">  
        <h1 className="text-2xl font-bold text-gray-800">Tender Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Create Tender
        </button>
      </div>

      {/* Tender List */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Problem</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{tender.title}</td>
                <td className="px-4 py-2 border">{tender.problem}</td>
                <td className="px-4 py-2 border">{tender.startDate}</td>
                <td className="px-4 py-2 border">{tender.endDate}</td>
                <td className="px-4 py-2 border">₹{tender.amount}</td>
                <td className="px-4 py-2 border">{tender.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center backdrop-blur-sm justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Create Tender</h2>

            <div className="grid gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Tender Title"
                className="border p-2 rounded w-full"
              />
              <select
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Problem</option>
                <option value="Sewage Overflow">Sewage Overflow</option>
                <option value="Blocked Drain">Blocked Drain</option>
                <option value="Pipeline Leakage">Pipeline Leakage</option>
              </select>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount (₹)"
                className="border p-2 rounded w-full"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded w-full"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTender}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderManagement;
