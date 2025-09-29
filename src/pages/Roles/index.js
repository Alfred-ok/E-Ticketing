import React, { useState, useEffect } from "react";
import AddRoleModal from "./AddRole";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Fetch roles
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/roles/getAllRoles`,{
       headers: {
              "ngrok-skip-browser-warning": "true",
            },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "00") {
          setRoles(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle role add
  const handleRoleAdded = (newRole) => {
    setRoles((prev) => [...prev, newRole]);
    setOpenModal(false);
  };

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
        <h2 className="text-xl font-bold">Roles</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition"
        >
          + Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Role ID</th>
              <th className="p-3">Role Name</th>
              <th className="p-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.roleId} className="border-b hover:bg-gray-50">
                <td className="p-3">{role.roleId}</td>
                <td className="p-3">{role.roleName}</td>
                <td className="p-3">{role.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Role Modal */}
      {openModal && (
        <AddRoleModal
          onClose={() => setOpenModal(false)}
          onRoleAdded={handleRoleAdded}
        />
      )}
    </div>
  );
}
