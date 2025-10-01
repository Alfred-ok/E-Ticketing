import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import { X } from "lucide-react";

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/Eticketing/getAllUsers`,{
           headers: {
              "ngrok-skip-browser-warning": "true",
            },
        });
        const data = await res.json();

        if (data.status === "00") {
          setUsers(data.data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        setError("⚠️ Could not connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  // Add user handler (after successful API call from AddUser)
  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setShowModal(false);
  };

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl">
      <div className="bg-gray-300 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
        <h2 className="text-xl font-bold">Users</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add User
        </button>
      </div>

      {/* Loading / Error States */}
      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Users Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-gray-50 shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Display Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={user.profilePicture || "https://via.placeholder.com/50"}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.displayName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">{user.departmentId || "-"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg relative">
          <div className="flex justify-between items-center bg-green-700 text-white py-3 px-4 rounded-lg mb-3">
            
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <button
              onClick={() => setShowModal(false)}
              className=" bg-green-500 hover:text-red-600 rounded-lg p-2"
            >
               <X className="text-white"/>
            </button>
          </div>
            
            <AddUser onAddUser={handleAddUser} />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
