// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboard, Ticket, PlusCircle, LogOut } from "lucide-react";

// export default function Sidebar() {
//   const location = useLocation();

//   const navItems = [
//     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     { to: "/tickets", label: "Tickets", icon: <Ticket size={18} /> },
//     { to: "/tickets/create", label: "Create Ticket", icon: <PlusCircle size={18} /> },
//     { to: "/users", label: "Users", icon: <PlusCircle size={18} /> },
//     { to: "/roles", label: "Roles", icon: <PlusCircle size={18} /> },
//   ];

//   return (
//     <aside className="w-64 p-2 h-screen bg-gradient-to-b from-green-700 to-green-600 text-white flex flex-col justify-between shadow-xl rounded-2xl mt-8 ml-4">
//       {/* Top Section */}
//       <div>
//         {/* Logo */}
//         <div className="flex items-center space-x-3 mb-8 px-4 pt-6">
//           <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-green-800 shadow">
//             G
//           </div>
//           <span className="font-semibold text-lg tracking-wide">GreenBo</span>
//         </div>

//         {/* Profile Card */}
//         <div className="flex flex-col items-center mb-10 bg-green-800 rounded-xl py-6 mx-4 shadow-md">
//           <img
//             src="https://randomuser.me/api/portraits/women/5.jpg"
//             alt="profile"
//             className="w-20 h-20 rounded-full mb-3 border-2 border-green-400 shadow"
//           />
//           <h3 className="font-semibold text-white">Jennifer Grant</h3>
//           <p className="text-sm text-green-200">Marketing Director</p>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-2 px-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 location.pathname === item.to
//                   ? "bg-green-500 text-white shadow-md"
//                   : "text-green-50 hover:bg-green-700 hover:scale-[1.02]"
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Footer / Exit */}
//       <div className="px-4 pb-6">
//         <button className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-100 hover:text-green-600 font-medium transition">
//           <LogOut size={18} />
//           Log Out
//         </button>
//       </div>
//     </aside>
//   );
// }









// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboard, Ticket, PlusCircle, LogOut } from "lucide-react";

// export default function Sidebar() {
//   const location = useLocation();

//   const navItems = [
    
//     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     /**OPeration */
//     { to: "/tickets", label: "Tickets", icon: <Ticket size={18} /> },
//     { to: "/tickets/create", label: "Issue Ticket", icon: <PlusCircle size={18} /> },
//     /**setup */
//     { to: "/users", label: "Users", icon: <PlusCircle size={18} /> },
//     { to: "/roles", label: "Roles", icon: <PlusCircle size={18} /> },
//     { to: "/department", label: "Department", icon: <PlusCircle size={18} /> },
//     { to: "/ticket", label: "Ticket Category", icon: <PlusCircle size={18} /> },
//     { to: "/priority", label: "Priority", icon: <PlusCircle size={18} /> },
//     { to: "/status", label: "Status", icon: <PlusCircle size={18} /> },
//   ];

//   return (
//     <aside className="w-64 p-2 min-h-screen bg-gradient-to-b from-green-700 to-green-600 text-white flex flex-col justify-between">
//       {/* Top Section */}
//       <div>
//         {/* Logo */}
//         <div className="flex items-center space-x-3 mb-6 px-4 pt-4 border-b border-green-600 pb-4">
//           <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-green-800 shadow">
//             G
//           </div>
//           <span className="font-semibold text-lg tracking-wide">GreenBo</span>
//         </div>

//         {/* Profile Card */}
//         {/*
//         <div className="flex flex-col items-center mb-10 bg-green-800 rounded-xl py-6 mx-4 shadow-md">
//           <img
//             src="https://randomuser.me/api/portraits/women/5.jpg"
//             alt="profile"
//             className="w-20 h-20 rounded-full mb-3 border-2 border-green-400 shadow"
//           />
//           <h3 className="font-semibold text-white">Jennifer Grant</h3>
//           <p className="text-sm text-green-200">Marketing Director</p>
//         </div>
//           */}

//         {/* Navigation */}
//         <nav className="space-y-2 px-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 location.pathname === item.to
//                   ? "bg-green-500 text-white shadow-md"
//                   : "text-green-50 hover:bg-green-700 hover:scale-[1.02]"
//               }`}
//             >
//               {item.icon}
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Footer / Exit */}
//       <div className="px-4 pb-4">
//         <button className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-100 hover:text-green-600 font-medium transition">
//           <LogOut size={18} />
//           Log Out
//         </button>
//       </div>
//     </aside>
//   );
// }












import { Link,useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  LogOut,
  Users,
  Settings,
  Layers,
} from "lucide-react";
import image from "../assets/GreenboLogo.png"

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Example: get role from localStorage or context
  const savedResponse = JSON.parse(localStorage.getItem("loginResponse"));
  const role = savedResponse.data.role //|| "superadmin" // "superadmin" | "admin" | "user"
  console.log(role);
  

  // Define sidebar items per role
  const menuConfig = {
    superAdmin: {
      operations: [
        { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/tickets", label: "Tickets", icon: <Ticket size={18} /> },
        { to: "/tickets/create", label: "Issue Ticket", icon: <PlusCircle size={18} /> },
        { to: "/ticketstracker", label: "Ticket Tracker", icon: <PlusCircle size={18} /> },
        //{ to: "/closedticket", label: "Closed Ticket", icon: <PlusCircle size={18} /> },
      ],
      setup: [
        { to: "/users", label: "Users", icon: <Users size={18} /> },
        { to: "/roles", label: "Roles", icon: <Settings size={18} /> },
        { to: "/department", label: "Department", icon: <Layers size={18} /> },
        { to: "/ticket", label: "Ticket Category", icon: <PlusCircle size={18} /> },
        { to: "/priority", label: "Priority", icon: <PlusCircle size={18} /> },
        { to: "/status", label: "Status", icon: <PlusCircle size={18} /> },
        { to: "/Inventory", label: "inventory", icon: <PlusCircle size={18} /> },
      ],
    },
    Admin: {
      operations: [
        { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/tickets", label: "Tickets", icon: <Ticket size={18} /> },
        { to: "/ticketstracker", label: "Ticket Tracker", icon: <PlusCircle size={18} /> },
      ],
      setup: [
        { to: "/department", label: "Department", icon: <Layers size={18} /> },
        { to: "/priority", label: "Priority", icon: <PlusCircle size={18} /> },
      ],
    },
    user: {
      operations: [
        { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/tickets/create", label: "Issue Ticket", icon: <PlusCircle size={18} /> },
        { to: "/ticketstracker", label: "Ticket Tracker", icon: <PlusCircle size={18} /> },
        { to: "/tickets", label: "Tickets", icon: <Ticket size={18} /> },
        
      ],
      setup: [],
    },
  };

  // Render links
  const renderLinks = (items) =>
    items.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          location.pathname === item.to
            ? "bg-green-500 text-white shadow-md"
            : "text-green-50 hover:bg-green-700 hover:scale-[1.02]"
        }`}
      >
        {item.icon}
        {item.label}
      </Link>
    ));

  const { operations, setup } = menuConfig[role] || menuConfig.user;

  return (
    <aside className="w-64 p-2 min-h-screen bg-gradient-to-b from-green-700 to-green-600 text-white flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-6 px-4 pt-4 border-b border-green-600 pb-4">
          <div className="w-10 h-10  rounded-full flex items-center justify-center font-bold text-green-800 ">
             <img src={image}/>
          </div>
          <span className="font-semibold text-lg tracking-wide">GreenBo</span>
         
        </div>

        {/* Navigation */}
        <nav className="space-y-6 px-3">
          {/* Operations */}
          {operations.length > 0 && (
            <div>
              {/* <h4 className="bg-green-100 text-green-700 rounded-md px-3 py-2 text-sm font-semibold mb-2 uppercase tracking-wide">
                Operations
              </h4> */}
              <div className="space-y-2">{renderLinks(operations)}</div>
            </div>
          )}

          {/* Setup */}
          {setup.length > 0 && (
            <div>
              <h4 className="bg-green-100 text-green-700 rounded-md px-3 py-2 text-sm font-semibold mb-2 uppercase tracking-wide">
                Setup
              </h4>
              <div className="space-y-2">{renderLinks(setup)}</div>
            </div>
          )}
        </nav>
      </div>

      {/* Footer / Exit */}
      <div className="px-4 pb-4 mt-2">
        <button className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-100 hover:text-green-600 font-medium transition"
          onClick={()=>navigate('/')}
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}


