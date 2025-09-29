import React, { useState, useEffect } from "react";

export default function Computers() {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    departmentLocation: "",
    userName: "",
    digitalCalendar: "",
    monitor: "",
    size: "",
    operatingSystem: "",
    computerType: "",
    computerModel: "",
    processorType: "",
    serialNo: "",
    hddSize: "",
    ramSize: "",
    upsApcBV6501: "",
    yealinkEPhoneSN: "",
    license: "",
    status: "Active",
  });

  // Fetch Computers
  useEffect(() => {
    const fetchComputers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/computers`,{
          headers: {
              "ngrok-skip-browser-warning": "true",
            },});
        const data = await res.json();

        if (res.ok) {
          setComputers(data);
        } else {
          setError("⚠️ Failed to fetch computers");
        }
      } catch (err) {
        setError("⚠️ Could not connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchComputers();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add Computer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/computers/addComputer`,
        {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setComputers((prev) => [...prev, result]);
        setShowModal(false);
        setFormData({
          departmentLocation: "",
          userName: "",
          digitalCalendar: "",
          monitor: "",
          size: "",
          operatingSystem: "",
          computerType: "",
          computerModel: "",
          processorType: "",
          serialNo: "",
          hddSize: "",
          ramSize: "",
          upsApcBV6501: "",
          yealinkEPhoneSN: "",
          license: "",
          status: "Active",
        });
      } else {
        setError("❌ Failed to add computer");
      }
    } catch (err) {
      setError("⚠️ Could not connect to server");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
        <h2 className="text-2xl font-bold">Computers</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Computer
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-gray-600">Loading computers...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Computers Table */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-gray-50 shadow rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">Processor</th>
                <th className="px-4 py-2">RAM</th>
                <th className="px-4 py-2">HDD</th>
                <th className="px-4 py-2">OS</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {computers.map((pc) => (
                <tr key={pc.id} className="border-b">
                  <td className="px-4 py-2">{pc.userName}</td>
                  <td className="px-4 py-2">{pc.departmentLocation}</td>
                  <td className="px-4 py-2">{pc.computerModel}</td>
                  <td className="px-4 py-2">{pc.processorType}</td>
                  <td className="px-4 py-2">{pc.ramSize}</td>
                  <td className="px-4 py-2">{pc.hddSize}</td>
                  <td className="px-4 py-2">{pc.operatingSystem}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        pc.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {pc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Computer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[1000px] shadow-lg relative max-h-[80vh] mt-6 overflow-y-auto">
          
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Computer</h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
            {/* General Info */}
            <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-100 mb-4 bg-green-600 rounded-lg p-4">General Info</h4>
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <input
                    type="text"
                    name="departmentLocation"
                    value={formData.departmentLocation}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">User Name</label>
                    <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Digital Calendar</label>
                    <input
                    type="text"
                    name="digitalCalendar"
                    value={formData.digitalCalendar}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                </div>
            </div>

            {/* Hardware Specs */}
            <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-100 mb-4 bg-green-600 rounded-lg p-4">Hardware Specs</h4>
                <div className="grid grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Monitor</label>
                    <input
                    type="text"
                    name="monitor"
                    value={formData.monitor}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Operating System</label>
                    <input
                    type="text"
                    name="operatingSystem"
                    value={formData.operatingSystem}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Computer Type</label>
                    <input
                    type="text"
                    name="computerType"
                    value={formData.computerType}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Computer Model</label>
                    <input
                    type="text"
                    name="computerModel"
                    value={formData.computerModel}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Processor Type</label>
                    <input
                    type="text"
                    name="processorType"
                    value={formData.processorType}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Serial No</label>
                    <input
                    type="text"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">HDD Size</label>
                    <input
                    type="text"
                    name="hddSize"
                    value={formData.hddSize}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">RAM Size</label>
                    <input
                    type="text"
                    name="ramSize"
                    value={formData.ramSize}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                </div>
            </div>

            {/* Accessories & License */}
            <div className="col-span-3 bg-gray-200 p-4 rounded-lg ">
                <h4 className="font-semibold  text-gray-100 mb-4 bg-green-600 rounded-lg p-4">Accessories & License</h4>
                <div className="grid grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">UPS APC BV6501</label>
                    <input
                    type="text"
                    name="upsApcBV6501"
                    value={formData.upsApcBV6501}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Yealink EPhone SN</label>
                    <input
                    type="text"
                    name="yealinkEPhoneSN"
                    value={formData.yealinkEPhoneSN}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">License</label>
                    <input
                    type="text"
                    name="license"
                    value={formData.license}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 border-gray-400"
                    />
                </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-3 mt-6">
                <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                >
                Save Computer
                </button>
            </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
