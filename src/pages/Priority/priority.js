import React, { useState, useEffect } from "react";

export default function TicketPriorities() {
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    priorityName: "",
    sortOrder: "",
    targetHours: "",
  });

  // Fetch Priorities
  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/priorities`,{
           headers: {
              "ngrok-skip-browser-warning": "true",
            },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setPriorities(data);
        } else {
          setError("⚠️ Unexpected response format");
        }
      } catch (err) {
        setError("⚠️ Could not connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchPriorities();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add Priority
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/priorities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          priorityName: formData.priorityName,
          sortOrder: Number(formData.sortOrder),
          targetHours: Number(formData.targetHours),
        }),
      });

      if (res.ok) {
        const savedPriority = await res.json();
        setPriorities((prev) => [...prev, savedPriority]);
        setShowModal(false);
        setFormData({ priorityName: "", sortOrder: "", targetHours: "" });
      } else {
        setError("❌ Failed to add priority");
      }
    } catch (err) {
      setError("⚠️ Could not connect to server");
    }
  };

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
        <h2 className="text-2xl font-bold">Ticket Priorities</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Priority
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-600">Loading priorities...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Priorities Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-gray-50 shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2">Priority ID</th>
                <th className="px-4 py-2">Priority Name</th>
                <th className="px-4 py-2">Sort Order</th>
                <th className="px-4 py-2">Target Hours</th>
              </tr>
            </thead>
            <tbody>
              {priorities.map((priority) => (
                <tr key={priority.priorityId} className="border-b">
                  <td className="px-4 py-2">{priority.priorityId}</td>
                  <td className="px-4 py-2">{priority.priorityName}</td>
                  <td className="px-4 py-2">{priority.sortOrder}</td>
                  <td className="px-4 py-2">{priority.targetHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Priority Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Priority</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Priority Name</label>
                <input
                  type="text"
                  name="priorityName"
                  value={formData.priorityName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Sort Order</label>
                <input
                  type="number"
                  name="sortOrder"
                  value={formData.sortOrder}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Target Hours</label>
                <input
                  type="number"
                  name="targetHours"
                  value={formData.targetHours}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Save Priority
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
