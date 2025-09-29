// import React, { useState } from "react";

// export default function AddUser({ onAddUser }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     displayName: "",
//     email: "",
//     phone: "",
//     departmentId: "",
//     isActive: true,
//     timezone: "Africa/Nairobi",
//     profilePicture: "",
//   });


//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // API call (you can replace with axios if needed)
//       await fetch(`${process.env.REACT_APP_API_URL}/api/Eticketing/createUser`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "true" },
//         body: JSON.stringify(formData),
//       });

//       onAddUser(formData);
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         name="displayName"
//         placeholder="Display Name"
//         value={formData.displayName}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone"
//         value={formData.phone}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         name="departmentId"
//         placeholder="Department ID"
//         value={formData.departmentId}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />
//       <input
//         type="text"
//         name="profilePicture"
//         placeholder="Profile Picture URL"
//         value={formData.profilePicture}
//         onChange={handleChange}
//         className="w-full p-2 border rounded"
//       />
//       <label className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           name="isActive"
//           checked={formData.isActive}
//           onChange={handleChange}
//         />
//         <span>Active</span>
//       </label>
//       <button
//         type="submit"
//         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
//       >
//         Save User
//       </button>
//     </form>
//   );
// }




import React, { useState, useEffect } from "react";

export default function AddUser({ onAddUser }) {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    phone: "",
    departmentId: "",
    role: "User", // default role
    isActive: true,
    timezone: "Africa/Nairobi",
    profilePicture: "",
    createdAt: new Date().toISOString(), // auto add timestamp
  });

  const [departments, setDepartments] = useState([]);

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/departments`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await res.json();
        if (data.status === "00" && data.data) {
          setDepartments(data.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Convert uploaded image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result, // base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/Eticketing/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(formData),
      });

      onAddUser(formData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded border-green-700"
      />
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={formData.displayName}
        onChange={handleChange}
        className="w-full p-2 border rounded border-green-700"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded border-green-700"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded border-green-700"
      />

      {/* Department Dropdown */}
      <select
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
        className="w-full p-2 border rounded border-green-700"
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept.departmentId} value={dept.departmentId}>
            {dept.departmentName}
          </option>
        ))}
      </select>

      {/* Role Dropdown */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border rounded border-green-700"
      >
        <option value="superAdmin">SuperAdmin</option>
        <option value="Admin">Admin</option>
        <option value="user">User</option>
      </select>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded border-green-700"
      />

      {/* Preview uploaded image */}
      {formData.profilePicture && (
        <div className="mt-2">
          <img
            src={formData.profilePicture}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border border-green-700"
          />
        </div>
      )}

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        <span>Active</span>
      </label>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
      >
        Save User
      </button>
    </form>
  );
}
