import React, { useState } from "react"
import Computers from "./Computers"
import Devices from "./Devices"

function Inventory() {
  const [activeTab, setActiveTab] = useState("computers")

  return (
    <div className="p-4 bg-white m-8 rounded-lg shadow-2xl">
      {/* Tab Headers */}
      <div className="flex border-2 bg-gray-200 rounded-t-2xl border-green-600 ">
        <button
          onClick={() => setActiveTab("computers")}
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "computers"
              ? " bg-green-600  text-gray-100 rounded-tl-lg"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Computers
        </button>
        <button
          onClick={() => setActiveTab("devices")}
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "devices"
              ? " bg-green-600  text-gray-100 rounded-tr-lg"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Devices
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-200 rounded-b-lg p-6">
        {activeTab === "computers" && <Computers />}
        {activeTab === "devices" && <Devices />}
      </div>
    </div>
  )
}

export default Inventory
