import React from "react";
import { FaUser } from "react-icons/fa";

function Navbar() {

  const savedResponse = JSON.parse(localStorage.getItem("loginResponse"));
  const name = savedResponse.data.displayName
  console.log(name);
  return (
    <div
      className="
        flex items-center justify-between 
        bg-green-700 text-white px-6 py-5
        shadow-[2px_2px_8px_rgba(0,0,0,0.2)]
        z-10
      "
    >


      {/* Middle: Search */}
      <div className="flex-1 px-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 rounded-lg text-black focus:outline-none"
        />
      </div>

      {/* Right: User */}
     <div className="flex items-center space-x-4">
        <FaUser className="text-xl hidden md:block" />
        <span className="hidden md:block">Hi, {name}</span>
      </div>
    </div>
  );
}

export default Navbar;
