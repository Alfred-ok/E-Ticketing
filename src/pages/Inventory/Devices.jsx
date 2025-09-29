// import React, { useState, useEffect } from "react";

// export default function Devices() {
//   const [devices, setDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const [formData, setFormData] = useState({
//     location: "",
//     model: "",
//     serialNumber: "",
//     status: "Active",
//     ipPortNo: "",
//     deviceType: "",
//   });

//   // Fetch Devices
//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const res = await fetch("http://192.168.1.253:8594/api/devices");
//         const data = await res.json();

//         if (res.ok) {
//           setDevices(data);
//         } else {
//           setError("⚠️ Failed to fetch devices");
//         }
//       } catch (err) {
//         setError("⚠️ Could not connect to server");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDevices();
//   }, []);

//   // Handle form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle Add Device
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://192.168.1.253:8594/api/devices", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setDevices((prev) => [...prev, result]);
//         setShowModal(false);
//         setFormData({
//           location: "",
//           model: "",
//           serialNumber: "",
//           status: "Active",
//           ipPortNo: "",
//           deviceType: "",
//         });
//       } else {
//         setError("❌ Failed to add device");
//       }
//     } catch (err) {
//       setError("⚠️ Could not connect to server");
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
//         <h2 className="text-2xl font-bold">Devices</h2>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
//         >
//           + Add Device
//         </button>
//       </div>

//       {/* Loading / Error */}
//       {loading && <p className="text-gray-600">Loading devices...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {/* Devices Table */}
//       {!loading && !error && (
//         <div className="overflow-x-auto bg-gray-50 shadow rounded-lg">
//           <table className="w-full text-sm text-left">
//             <thead className="bg-green-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Location</th>
//                 <th className="px-4 py-2">Model</th>
//                 <th className="px-4 py-2">Serial Number</th>
//                 <th className="px-4 py-2">IP/Port</th>
//                 <th className="px-4 py-2">Device Type</th>
//                 <th className="px-4 py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {devices.map((device) => (
//                 <tr key={device.id} className="border-b">
//                   <td className="px-4 py-2">{device.location}</td>
//                   <td className="px-4 py-2">{device.model}</td>
//                   <td className="px-4 py-2">{device.serialNumber}</td>
//                   <td className="px-4 py-2">{device.ipPortNo}</td>
//                   <td className="px-4 py-2">{device.deviceType}</td>
//                   <td className="px-4 py-2">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         device.status === "Active"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {device.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

// {/* Add Device Modal */}
// {showModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg relative max-h-[90vh] mt-6 overflow-y-auto">
//       <button
//         onClick={() => setShowModal(false)}
//         className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//       >
//         ✕
//       </button>
//       <h3 className="text-xl font-semibold mb-4">Add New Device</h3>

//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         {/* General Info */}
//         <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
//           <h4 className="font-semibold text-gray-100 mb-4 bg-green-600 rounded-lg p-4">General Info</h4>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 border-gray-400"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Model</label>
//               <input
//                 type="text"
//                 name="model"
//                 value={formData.model}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 border-gray-400"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Serial Number</label>
//               <input
//                 type="text"
//                 name="serialNumber"
//                 value={formData.serialNumber}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 border-gray-400"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Device Type</label>
//               <input
//                 type="text"
//                 name="deviceType"
//                 value={formData.deviceType}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 border-gray-400"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Network & Status */}
//         <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
//           <h4 className="font-semibold text-gray-100 mb-4 bg-green-600 rounded-lg p-4">Network & Status</h4>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">IP/Port</label>
//               <input
//                 type="text"
//                 name="ipPortNo"
//                 value={formData.ipPortNo}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 border-gray-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Status</label>
//               <input
//                 type="text"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 border-gray-400"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="col-span-2 mt-6">
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
//           >
//             Save Device
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }









import { Settings } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

   const [formData, setFormData] = useState({
     location: "",   model: "",
     serialNumber: "",
     status: "Active",
     ipPortNo: "",
     deviceType: "",
   });

  // Fetch all devices initially
  useEffect(() => {
    fetchDevices();
  }, []);

  // Fetch Devices (all or by type)
  const fetchDevices = async (type = "All") => {
    setLoading(true);
    try {
      let url =
        type === "All"
          ? `${process.env.REACT_APP_API_URL}/api/devices`
          : `${process.env.REACT_APP_API_URL}/api/devices/getDevicesByType/${type}`;

      const res = await fetch(url,{headers: {
              "ngrok-skip-browser-warning": "true",
            },});
      const data = await res.json();

      if (res.ok) {
        setDevices(data);

        // Collect unique device types for sidebar
        if (type === "All") {
          const uniqueTypes = [...new Set(data.map((d) => d.deviceType))];
          setDeviceTypes(uniqueTypes);
        }
      } else {
        setError("⚠️ Failed to fetch devices");
      }
    } catch (err) {
      setError("⚠️ Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

   // Handle form change
    const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: value,
     }));
   };


   // Handle Add Device
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await fetch(`${process.env.REACT_APP_API_URL}/api/devices`, {
         method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
         body: JSON.stringify(formData),
       });

       const result = await res.json();

       if (res.ok) {
         setDevices((prev) => [...prev, result]);
         setShowModal(false);
         setFormData({
           location: "",
           model: "",
           serialNumber: "",
           status: "Active",
           ipPortNo: "",
           deviceType: "",
         });
       } else {
         setError("❌ Failed to add device");
       }
     } catch (err) {
       setError("⚠️ Could not connect to server");
     }
   };

  return (
    <div className="flex bg-gray-100 rounded-lg shadow-lg">
      {/* Sidebar (Device Types) */}
      <div className="w-1/4 bg-green-600 border-r shadow-xl p-6 m-2 rounded-lg ">
        <h3 className="text-lg font-semibold mb-4 bg-gray-600 p-2 rounded-lg text-white flex items-center"><Settings size={18} className="mr-1"/>Device Types</h3>
        <ul>
          <li
            onClick={() => {
              setSelectedType("All");
              fetchDevices("All");
            }}
            className={`p-2 mb-2 rounded cursor-pointer flex items-center font-semibold ${
              selectedType === "All"
                ? "bg-gray-200 text-green-600 font-semibold"
                : "hover:bg-gray-200 hover:text-green-600 text-white"
            }`}
          >
           { selectedType === "All" ? <FaRegCircleDot className="mr-1"/> : <FaDotCircle className="mr-1"/>} All Devices
          </li>
          {deviceTypes.map((type) => (
            <li
              key={type}
              onClick={() => {
                setSelectedType(type);
                fetchDevices(type);
              }}
              className={`p-2 mb-2 rounded cursor-pointer font-semibold flex items-center ${
                selectedType === type
                  ? "bg-gray-200 text-green-600 "
                  : "hover:bg-gray-200 hover:text-green-600 text-white"
              }`}
            >
              { selectedType === type ? <FaRegCircleDot className="mr-1"/> : <FaDotCircle className="mr-1"/>}{type}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-green-600 p-3 rounded-lg">
          <h2 className="text-2xl font-bold text-white">
            {selectedType === "All" ? "All Devices" : `${selectedType} Devices`}
          </h2>
          <button className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
            onClick={() => setShowModal(true)}
          >
            + Add Device
          </button>
        </div>

        {/* Error / Loading */}
        {loading && <p>Loading devices...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Devices Table */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Model</th>
                  <th className="px-4 py-2">Serial Number</th>
                  <th className="px-4 py-2">IP/Port</th>
                  <th className="px-4 py-2">Device Type</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{device.location}</td>
                    <td className="px-4 py-2">{device.model}</td>
                    <td className="px-4 py-2">{device.serialNumber}</td>
                    <td className="px-4 py-2">{device.ipPortNo}</td>
                    <td className="px-4 py-2">{device.deviceType}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          device.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {device.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>



     {/* Add Device Modal */}
     {showModal && (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
     <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg relative max-h-[90vh] mt-6 overflow-y-auto">
       <button
         onClick={() => setShowModal(false)}
         className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
       >
         ✕
       </button>
       <h3 className="text-xl font-semibold mb-4">Add New Device</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
         {/* General Info */}
         <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
           <h4 className="font-semibold text-gray-100 mb-4 bg-green-600 rounded-lg p-4">General Info</h4>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium mb-2">Location</label>
               <input
                 type="text"
                 name="location"
                 value={formData.location}
                 onChange={handleChange}
                 className="w-full border rounded px-3 py-2 border-gray-400"
                 required
               />
             </div>
             <div>
               <label className="block text-sm font-medium mb-2">Model</label>
               <input
                 type="text"
                 name="model"
                 value={formData.model}
                 onChange={handleChange}
                 className="w-full border rounded px-3 py-2 border-gray-400"
                 required
               />
             </div>
             <div>
               <label className="block text-sm font-medium mb-2">Serial Number</label>
               <input
                 type="text"
                 name="serialNumber"
                 value={formData.serialNumber}
                 onChange={handleChange}
                 className="w-full border rounded px-3 py-2 border-gray-400"
                 required
              />
             </div>
             <div>
               <label className="block text-sm font-medium mb-2">Device Type</label>
               <input
                 type="text"
                 name="deviceType"
                 value={formData.deviceType}
                 onChange={handleChange}
                 className="w-full border rounded px-3 py-2 border-gray-400"
                 required
               />
             </div>
           </div>
         </div>
         {/* Network & Status */}
         <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
           <h4 className="font-semibold text-gray-100 mb-4 bg-green-600 rounded-lg p-4">Network & Status</h4>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium mb-2">IP/Port</label>
               <input
                 type="text"
                 name="ipPortNo"
                 value={formData.ipPortNo}
                 onChange={handleChange}
                 className="w-full border rounded px-3 py-2 border-gray-400"
               />
             </div>
             <div>
               <label className="block text-sm font-medium mb-2">Status</label>
               <input               type="text"
                 name="status"
                 value={formData.status}
                 onChange={handleChange}
                 className="w-full border rounded px-3 py-2 border-gray-400"
               />
             </div>
           </div>
         </div>
         {/* Submit Button */}
         <div className="col-span-2 mt-6">
           <button
             type="submit"
             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
           >
             Save Device        
             </button>
         </div>
       </form>
     </div>
   </div>
 )}

    </div>
  );
}
