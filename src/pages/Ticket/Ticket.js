import React, { useState, useEffect } from "react";

export default function TicketCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    forModule: "",
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/categories`,{ headers: {
              "ngrok-skip-browser-warning": "true",
            },});
        const data = await res.json();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setError("⚠️ Unexpected response format");
        }
      } catch (err) {
        setError("⚠️ Could not connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const savedCategory = await res.json();
        setCategories((prev) => [...prev, savedCategory]);
        setShowModal(false);
        setFormData({ categoryName: "", forModule: "" });
      } else {
        setError("❌ Failed to add category");
      }
    } catch (err) {
      setError("⚠️ Could not connect to server");
    }
  };

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
        <h2 className="text-2xl font-bold">Ticket Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Category
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-600">Loading categories...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Categories Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-gray-50 shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2">Category ID</th>
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2">For Module</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.categoryId} className="border-b">
                  <td className="px-4 py-2">{cat.categoryId}</td>
                  <td className="px-4 py-2">{cat.categoryName}</td>
                  <td className="px-4 py-2">{cat.forModule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">For Module</label>
                <input
                  type="text"
                  name="forModule"
                  value={formData.forModule}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
