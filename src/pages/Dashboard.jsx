// // src/pages/Dashboard.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Bar,
//   BarChart,
// } from "recharts";
// import { FaTicketAlt, FaHourglassHalf, FaCheckCircle, FaFolderOpen } from "react-icons/fa"; 

// const tickets = [
//   { id: 1, title: "Login issue", status: "Open", priority: "High", created: "2025-08-20", assignedTo: "John Doe" },
//   { id: 2, title: "Payment not processing", status: "In Progress", priority: "Medium", created: "2025-08-19", assignedTo: "Sarah Lee" },
//   { id: 3, title: "Bug in dashboard report", status: "Closed", priority: "Low", created: "2025-08-18", assignedTo: "Mike Ross" },
//   { id: 4, title: "UI not responsive", status: "Open", priority: "High", created: "2025-08-21", assignedTo: "Emily Clark" },
// ];

// const monthlyActivity = [
//   { month: "Jan", value: 8200 },
//   { month: "Feb", value: 9500 },
//   { month: "Mar", value: 11000 },
//   { month: "Apr", value: 10200 },
//   { month: "May", value: 12450 },
//   { month: "Jun", value: 9800 },
//   { month: "Jul", value: 10500 },
//   { month: "Aug", value: 9700 },
//   { month: "Sep", value: 12000 },
//   { month: "Oct", value: 10800 },
//   { month: "Nov", value: 11500 },
//   { month: "Dec", value: 10000 },
// ];

// export default function Dashboard() {
//   const totalTickets = tickets.length;
//   const openTickets = tickets.filter((t) => t.status === "Open").length;
//   const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length;
//   const closedTickets = tickets.filter((t) => t.status === "Closed").length;

//   const savedResponse = JSON.parse(localStorage.getItem("loginResponse"));
//   const name = savedResponse.data.displayName




//   return (
//     <div className="flex min-h-screen ">
//       <main className="flex-1 p-8">
//         {/* Welcome Banner */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 text-white rounded-2xl p-8 shadow-lg mb-8"
//         >
//           <h2 className="text-3xl font-bold">Welcome back, {name} 👋</h2>
//           <p className="mt-2 text-sm opacity-90">
//             Here’s your latest support ticket system insights.
//           </p>
//           <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-300 opacity-20 rounded-full blur-2xl" />
//           <div className="absolute bottom-0 right-10 w-16 h-16 bg-green-700 opacity-30 rounded-full blur-xl" />
//         </motion.div>

//         {/* Stats + Chart Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//           {/* Ticket Stats */}

// {/* Ticket Stats */}
// <motion.div
//   initial={{ opacity: 0, x: -30 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.6 }}
//   className=""
// >
//   <h3 className="text-lg font-semibold text-gray-700 mb-6 shadow-lg flex items-center gap-2 bg-white p-6 rounded-xl">
//     <FaTicketAlt className="text-green-600" /> Ticket Overview
//   </h3>

//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//     {/* Total Tickets */}
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="flex items-center gap-5 bg-green-600 text-white rounded-xl p-6 shadow-lg"
//     >
//       <div className="bg-green-100 p-4 rounded-lg">
//         <FaTicketAlt className="text-green-600 text-xl" />
//       </div>
//       <div>
//         <p className="text-xs">Total Tickets</p>
//         <p className="text-2xl font-bold">{totalTickets}</p>
//       </div>
//     </motion.div>

//     {/* Open Tickets */}
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="flex items-center gap-5 bg-red-600 text-white rounded-xl p-6 shadow-lg"
//     >
//       <div className="bg-red-100 p-4 rounded-lg">
//         <FaFolderOpen className="text-red-600 text-xl" />
//       </div>
//       <div>
//         <p className="text-xs">Open</p>
//         <p className="text-2xl font-bold">{openTickets}</p>
//       </div>
//     </motion.div>

//     {/* In Progress */}
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="flex items-center gap-5 bg-yellow-600 text-white rounded-xl p-6 shadow-lg"
//     >
//       <div className="bg-yellow-100 p-4 rounded-lg">
//         <FaHourglassHalf className="text-yellow-600 text-xl" />
//       </div>
//       <div>
//         <p className="text-xs">In Progress</p>
//         <p className="text-2xl font-bold">{inProgressTickets}</p>
//       </div>
//     </motion.div>

//     {/* Closed */}
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="flex items-center gap-5 bg-emerald-600 text-white rounded-xl p-6 shadow-lg"
//     >
//       <div className="bg-emerald-100 p-4 rounded-lg">
//         <FaCheckCircle className="text-emerald-600 text-xl" />
//       </div>
//       <div>
//         <p className="text-xs">Closed</p>
//         <p className="text-2xl font-bold">{closedTickets}</p>
//       </div>
//     </motion.div>
//   </div>
// </motion.div>

//           {/* Activity Chart */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-green-500"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Activity</h2>
//               <select className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-md">
//                 <option>2025</option>
//                 <option>2024</option>
//                 <option>2023</option>
//               </select>
//             </div>
//             <div className="h-56">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={monthlyActivity}>
//                   <XAxis dataKey="month" axisLine={false} tickLine={false} />
//                   <YAxis hide />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#f0fdf4",
//                       borderRadius: "8px",
//                       border: "1px solid #22c55e",
//                       fontSize: "12px",
//                       color: "#166534",
//                     }}
//                   />
//                   <Bar
//                     dataKey="value"
//                     radius={[6, 6, 0, 0]}
//                     shape={(props) => {
//                       const { x, y, width, height, index, payload } = props;
//                       const prev = index > 0 ? monthlyActivity[index - 1].value : payload.value;
//                       const color = payload.value >= prev ? "#22c55e" : "#ef4444";
//                       return (
//                         <rect x={x} y={y} width={width} height={height} fill={color} rx={6} ry={6} />
//                       );
//                     }}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </motion.div>
//         </div>

//         {/* Support Tickets */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 rounded-2xl p-6 shadow-lg"
//         >
          
//           <div className="flex justify-between p-2 mb-4">
//             <h2 className="text-xl font-bold text-white">Support Tickets</h2>
//             <button className="p-3 text-gray-700 bg-green-100 rounded-xl"> View More</button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {tickets.map((ticket) => (
//               <motion.div
//                 key={ticket.id}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white rounded-xl p-4 shadow border border-green-100"
//               >
//                 <h3 className="font-semibold text-gray-800 mb-1">{ticket.title}</h3>
//                 <p className="text-xs text-gray-500 mb-2">
//                   {ticket.created} • {ticket.assignedTo}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs font-medium">Priority: {ticket.priority}</span>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-bold ${
//                       ticket.status === "Open"
//                         ? "bg-red-100 text-red-600"
//                         : ticket.status === "In Progress"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-green-100 text-green-600"
//                     }`}
//                   >
//                     {ticket.status}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
        
//       </main>
//     </div>
//   );
// }





// src/pages/Dashboard.jsx
import React, { useEffect, useState, } from "react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { FaTicketAlt, FaHourglassHalf, FaCheckCircle, FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/tickets/listTickets`,{
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        const data = await res.json();
        if (data.status === "00") {
          setTickets(data.data);
        } else {
          console.error("API Error:", data.statusDescription);
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Ticket Stats
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "NEW" || t.status === "OPEN").length;
  const inProgressTickets = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const closedTickets = tickets.filter((t) => t.status === "CLOSED").length;

  const savedResponse = JSON.parse(localStorage.getItem("loginResponse"));
  const name = savedResponse?.data?.displayName || "User";

  const monthlyActivity = [
    { month: "Jan", value: 8200 },
    { month: "Feb", value: 9500 },
    { month: "Mar", value: 11000 },
    { month: "Apr", value: 10200 },
    { month: "May", value: 12450 },
    { month: "Jun", value: 9800 },
    { month: "Jul", value: 10500 },
    { month: "Aug", value: 9700 },
    { month: "Sep", value: 12000 },
    { month: "Oct", value: 10800 },
    { month: "Nov", value: 11500 },
    { month: "Dec", value: 10000 },
  ];

  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 text-white rounded-2xl p-8 shadow-lg mb-8"
        >
          <h2 className="text-3xl font-bold">Welcome back, {name} 👋</h2>
          <p className="mt-2 text-sm opacity-90">
            Here’s your latest support ticket system insights.
          </p>
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-300 opacity-20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-10 w-16 h-16 bg-green-700 opacity-30 rounded-full blur-xl" />
        </motion.div>

        {/* Stats + Chart Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Ticket Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-6 shadow-lg flex items-center gap-2 bg-white p-6 rounded-xl">
              <FaTicketAlt className="text-green-600" /> Ticket Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Total */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-5 bg-green-600 text-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-green-100 p-4 rounded-lg">
                  <FaTicketAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs">Total Tickets</p>
                  <p className="text-2xl font-bold">{totalTickets}</p>
                </div>
              </motion.div>

              {/* Open */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-5 bg-red-600 text-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-red-100 p-4 rounded-lg">
                  <FaFolderOpen className="text-red-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs">Open</p>
                  <p className="text-2xl font-bold">{openTickets}</p>
                </div>
              </motion.div>

              {/* In Progress */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-5 bg-yellow-600 text-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <FaHourglassHalf className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs">In Progress</p>
                  <p className="text-2xl font-bold">{inProgressTickets}</p>
                </div>
              </motion.div>

              {/* Closed */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-5 bg-emerald-600 text-white rounded-xl p-6 shadow-lg"
              >
                <div className="bg-emerald-100 p-4 rounded-lg">
                  <FaCheckCircle className="text-emerald-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs">Closed</p>
                  <p className="text-2xl font-bold">{closedTickets}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-green-500"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Activity</h2>
              <select className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-md">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyActivity}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f0fdf4",
                      borderRadius: "8px",
                      border: "1px solid #22c55e",
                      fontSize: "12px",
                      color: "#166534",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[6, 6, 0, 0]}
                    shape={(props) => {
                      const { x, y, width, height, index, payload } = props;
                      const prev =
                        index > 0 ? monthlyActivity[index - 1].value : payload.value;
                      const color = payload.value >= prev ? "#22c55e" : "#ef4444";
                      return (
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill={color}
                          rx={6}
                          ry={6}
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Support Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex justify-between p-2 mb-4">
            <h2 className="text-xl font-bold text-white">Support Tickets</h2>
            <button className="p-3 text-gray-700 bg-green-100 rounded-xl" onClick={()=>navigate('/tickets')}>
              View More
            </button>
          </div>

          {loading ? (
            <p className="text-white">Loading tickets...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {tickets.map((ticket) => (
                <motion.div
                  key={ticket.ticketId}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-4 shadow border border-green-100"
                >
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {ticket.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(ticket.reportedAt).toLocaleDateString()} •{" "}
                    {ticket.assignee || "Unassigned"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                      Priority: {ticket.priority}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        ticket.status === "NEW" || ticket.status === "OPEN"
                          ? "bg-red-100 text-red-600"
                          : ticket.status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
