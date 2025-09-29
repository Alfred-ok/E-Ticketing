import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Statuses() {
  const [statuses, setStatuses] = useState([]);
  const [formData, setFormData] = useState({
    statusName: "",
    isTerminal: false,
  });

  const [loading, setLoading] = useState(false);

  const fetchStatuses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/statuses`,{
         headers: {
              "ngrok-skip-browser-warning": "true",
            },
      });
      setStatuses(res.data);
    } catch (err) {
      console.error("Error fetching statuses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/statuses`, formData,{
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      setFormData({ statusName: "", isTerminal: false });
      fetchStatuses();
    } catch (err) {
      console.error("Error creating status:", err);
    }
  };

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4 py-4 px-5 bg-green-600 rounded-lg text-white">Manage Ticket Statuses</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-4">
        <input
          type="text"
          name="statusName"
          value={formData.statusName}
          onChange={handleChange}
          placeholder="Status Name"
          className="border p-2 rounded w-1/3"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isTerminal"
            checked={formData.isTerminal}
            onChange={handleChange}
          />
          Terminal
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Status
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading statuses...</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Status Name</th>
                <th className="border px-4 py-2">Terminal</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map((status) => (
                <tr key={status.statusId}>
                  <td className="border px-4 py-2">{status.statusId}</td>
                  <td className="border px-4 py-2">{status.statusName}</td>
                  <td className="border px-4 py-2">
                    {status.isTerminal ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
