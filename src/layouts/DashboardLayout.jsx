


// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import imgbg from "../assets/Seafoam.jpg";

// export default function DashboardLayout({ children }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div
//       className="flex h-screen relative"
//       style={{
//          backgroundImage: `url(${imgbg})`,
//         backgroundColor: "rgba(204, 211, 223, 0.2)", //'#ccd3df',
//         backgroundSize:"200px",
//         backgroundBlendMode: "overlay",  // Use 'overlay' or 'multiply' for strong color dominance ///color//saturation
//         backgroundPosition: "center", // Center the image
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/5"></div>
//       {/* Change bg-black/40 → bg-green-900/40 or any Tailwind color with opacity */}

//       {/* Page Content */}
//       <div className="relative flex w-full">
//         {/* Sidebar */}
//         <Sidebar isCollapsed={isCollapsed}/>

//         {/* Right side (Navbar + Main) */}
//         <div className="flex flex-col flex-1">
//           {/* Navbar */}
//           <Navbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />

//           {/* Main Content */}
//           <main className="flex-1 p-2 overflow-y-auto">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import imgbg from "../assets/Seafoam.jpg";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Adjust collapsed width depending on your Sidebar design
  const sidebarWidth = isCollapsed ? "64px" : "240px"; 

  return (
    <div
      className="h-screen relative"
      style={{
        backgroundImage: `url(${imgbg})`,
        backgroundColor: "rgba(204, 211, 223, 0.2)",
        backgroundSize: "200px",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Sidebar (Fixed) */}
      <div
        className="fixed top-0 left-0 h-full z-20 transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* Navbar (Fixed) */}
      <div
        className="fixed top-0 right-0 left-0 h-16 z-10"
        style={{ marginLeft: sidebarWidth }}
      >
        <Navbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      </div>

      {/* Main Content (scrollable area) */}
      <main
        className="relative overflow-y-auto p-2 h-screen"
        style={{
          marginLeft: sidebarWidth,
          marginTop: "64px", // height of Navbar
        }}
      >
        {children}
      </main>
    </div>
  );
}
