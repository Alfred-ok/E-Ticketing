import React, { useState, useEffect } from "react";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    departmentCode: "",
    departmentName: "",
    isActive: true,
    createdByUserId: 1,
  });

  // Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/departments`,{
           headers: {
              "ngrok-skip-browser-warning": "true",
            },
        });
        const data = await res.json();

        console.log(data);
        if (data.status === "00") {
          setDepartments(data.data);
        } else {
          setError("⚠️ Failed to fetch departments");
        }
      } catch (err) {
        setError("⚠️ Could not connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Add Department
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString();
      const newDept = {
        ...formData,
        createdAt: now,
        updatedAt: now,
        updatedByUserId: formData.createdByUserId,
      };

      const res = await fetch(`${process.env.REACT_APP_API_URL}/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(newDept),
      });

      const result = await res.json();

      if (res.ok && result.status === "00") {
        setDepartments((prev) => [...prev, result.data]);
        setShowModal(false);
        setFormData({
          departmentCode: "",
          departmentName: "",
          isActive: true,
          createdByUserId: 1,
        });
      } else {
        setError("❌ Failed to add department");
      }
    } catch (err) {
      setError("⚠️ Could not connect to server");
    }
  };

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
        <h2 className="text-2xl font-bold">Departments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Department
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-600">Loading departments...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Departments Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-gray-50 shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.departmentId} className="border-b">
                  <td className="px-4 py-2">{dept.departmentCode}</td>
                  <td className="px-4 py-2">{dept.departmentName}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        dept.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dept.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {dept.createdAt
                      ? new Date(dept.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Department Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Department</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Department Code</label>
                <input
                  type="text"
                  name="departmentCode"
                  value={formData.departmentCode}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Active</label>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Save Department
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
