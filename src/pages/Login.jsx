// src/pages/Login.jsx
import React, { useState } from "react";
import { FaPhoneAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import imgbg from "../assets/bggreen.jpg"
import greenbo from "../assets/Greenbo-Logo.png"



export default function Login() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/Eticketing/login`, {
      method: "POST",
       headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      body: JSON.stringify({ phone, pin }),
    });

    const response = await res.json();
    console.log("Login Response:", response);
    localStorage.setItem("loginResponse", JSON.stringify(response));

    if (response.status === "00") {
      // ✅ Save data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert(response.statusDescription || "Login failed!");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="relative w-full h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-green-700"></div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-200" style={{ backgroundImage: `url(${imgbg})` }}></div>

      {/* Login Card - Centered Absolute */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-xl shadow-2xl p-8">
        <img src={greenbo} alt="greenbo company logo" style={{height:"6rem", margin:"10px auto"}} />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          E-Ticket Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Phone Input */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-600">
            <FaPhoneAlt className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* PIN Input */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-600">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
