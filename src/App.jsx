import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
//import Tickets from "./pages/TicketReport";
import TicketDetail from "./pages/TicketDetail";
import CreateTicket from "./pages/CreateTicket";
import Login from "./pages/Login";
import Users from "./pages/Users/Users";
import Roles from "./pages/Roles";
import Departments from "./pages/Departments/Departments";
import TicketCategories from "./pages/Ticket/Ticket";
import TicketPriorities from "./pages/Priority/priority";
import Statuses from "./pages/Status/Status";
//import TicketTracker from "./pages/TicketTracker/TicketTracker";
//import ClosedTicket from "./pages/Closedticket/ClosedTicket";
import Inventory from "./pages/Inventory/Inventory";
import TaskBoard from "./pages/TicketTracker/TaskBoard";
import TicketReport from "./pages/TicketReport";
import TicketTimeline from "./pages/TicketTimeline";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/ticketReport" element={<DashboardLayout><TicketReport/></DashboardLayout>} />
        <Route path="/ticketTimeline" element={<DashboardLayout><TicketTimeline/></DashboardLayout>} />
        <Route path="/tickets/:id" element={<DashboardLayout><TicketDetail /></DashboardLayout>} />
        <Route path="/tickets/create" element={<DashboardLayout><CreateTicket /></DashboardLayout>} />
        <Route path="/users" element={<DashboardLayout><Users/></DashboardLayout>} />
        <Route path="/roles" element={<DashboardLayout><Roles/></DashboardLayout>} />
        <Route path="/department" element={<DashboardLayout><Departments/></DashboardLayout>} />
        <Route path="/ticket" element={<DashboardLayout><TicketCategories/></DashboardLayout>} />
        <Route path="/priority" element={<DashboardLayout><TicketPriorities/></DashboardLayout>} />
        <Route path="/status" element={<DashboardLayout><Statuses/></DashboardLayout>} />
        {/* <Route path="/ticketstracker" element={<DashboardLayout><TicketTracker/></DashboardLayout>} /> */}
        <Route path="/ticketstracker" element={<DashboardLayout><TaskBoard/></DashboardLayout>} />
        {/* <Route path="/closedticket" element={<DashboardLayout><ClosedTicket/></DashboardLayout>} /> */}
        <Route path="/inventory" element={<DashboardLayout><Inventory/></DashboardLayout>} />
      </Routes>
    </Router>
  );
}
