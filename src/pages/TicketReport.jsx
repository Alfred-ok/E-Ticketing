import { useEffect, useState } from "react";
import jsPDF from "jspdf";
//import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  FaHashtag,
  FaFileAlt,
  FaAlignLeft,
  FaTags,
  FaExclamationCircle,
  FaTasks,
  FaBuilding,
  FaUser,
  FaUserTie,
  FaClock,
  FaCalendarAlt,
  FaFlag,
} from "react-icons/fa";

export default function TicketReport() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [search, setSearch] = useState("");

  // Modal
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const savedResponse = JSON.parse(localStorage.getItem("loginResponse"));
  console.log(savedResponse);
  const departmentId = savedResponse?.data?.departmentId; //department Id
  const role = savedResponse?.data?.role; //role

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let apiUrl = "";

        if (role === "Admin") {
          apiUrl = `${process.env.REACT_APP_API_URL}/api/tickets/findBydepartmentId?departmentId=${departmentId}`;
        } else if (role === "user") {
          const requesterUserId = savedResponse?.data?.userId;
          apiUrl = `${process.env.REACT_APP_API_URL}/api/tickets/listTicketsBYUSERID?requesterUserId=${requesterUserId}`;
        } else {
          // superadmin fallback
          apiUrl = `${process.env.REACT_APP_API_URL}/api/tickets/listTickets`;
        }
        const res = await fetch(apiUrl,{
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        const data = await res.json();

        if (data.status === "00") {
          setTickets(data.data);
          setFilteredTickets(data.data);
        } else {
          console.error("Failed to fetch tickets:", data.statusDescription);
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Apply filters + search
  useEffect(() => {
    let filtered = tickets;

    if (statusFilter) filtered = filtered.filter((t) => t.status === statusFilter);
    if (priorityFilter) filtered = filtered.filter((t) => t.priority === priorityFilter);
    if (departmentFilter) filtered = filtered.filter((t) => t.department === departmentFilter);
    if (search)
      filtered = filtered.filter(
        (t) =>
          t.ticketNo.toLowerCase().includes(search.toLowerCase()) ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.requester.toLowerCase().includes(search.toLowerCase())
      );

    setFilteredTickets(filtered);
    setCurrentPage(1); // reset to first page when filters change
  }, [statusFilter, priorityFilter, departmentFilter, search, tickets]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(startIdx, startIdx + itemsPerPage);

  const getStatusBadge = (status) => {
    let color = "bg-gray-300 text-gray-800";
    if (status === "Open") color = "bg-green-200 text-green-800";
    if (status === "Closed") color = "bg-red-200 text-red-800";
    if (status === "In Progress") color = "bg-yellow-200 text-yellow-800";
    return <span className={`px-2 py-1 rounded-full text-sm font-medium ${color}`}>{status}</span>;
  };




  // 📌 Export to PDF
  const exportPDF = () => {
  const doc = new jsPDF();
  doc.text("Tickets Report", 14, 16);

  autoTable(doc, {   // ✅ use autoTable function, not doc.autoTable
    startY: 20,
    head: [["Ticket No", "Title","Description","Category","Status", "Priority", "Requester","Department","Assignee",/*"Location",*/"Reported At",/*"Deadline Time","Resolved Time",*/"Closed Time"]],
    body: filteredTickets.map((t) => [
      t.ticketNo,
      t.title,
      t.description,
      t.category,
      t.status,
      t.priority,
      t.requester,
      t.department,
      t.assignee,
      /*t.location,*/
      new Date(t.reportedAt).toLocaleString(),
      /*new Date(t.dueAt).toLocaleString(),
      new Date(t.resolvedAt).toLocaleString(),*/
      new Date(t.closedAt).toLocaleString(),
    ]),
  styles: {
    fontSize: 7,          // shrink font slightly
    cellPadding: 2,
    overflow: "linebreak" // ✅ wrap text
  },
  headStyles: {
    fillColor: [41, 128, 185],
    textColor: 255,
    fontSize: 8,
  },
  });

  doc.save("tickets_report.pdf");
};

  // 📌 Export to Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredTickets.map((t) => ({
        "Ticket No": t.ticketNo,
        Title: t.title,
        Description:t.description,
        Category:t.category,
        Status: t.status,
        Priority: t.priority,
        Requester: t.requester,
        Assignee:t.assignee,
        Department:t.department,
        Location:t.location,
        "Reported At": new Date(t.reportedAt).toLocaleString(),
        "Deadline Time": new Date(t.dueAt).toLocaleString(),
        "Resolved Time": new Date(t.resolvedAt).toLocaleString(),
        "Closed Time": new Date(t.closedAt).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "tickets_report.xlsx");
  };





  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl">
      <h1 className="text-xl font-bold mb-6 py-4 px-5 bg-green-600 rounded-lg text-white">
        Ticket Reports
      </h1>
      {/* Export Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Export PDF
        </button>
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Export Excel
        </button>
      </div>


      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by ticket no, title, requester..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 flex-1 min-w-[200px]"
        />

        <select
          className="border rounded-lg p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          className="border rounded-lg p-2"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          className="border rounded-lg p-2"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {[...new Set(tickets.map((t) => t.department).filter(Boolean))].map((dept, idx) => (
            <option key={idx} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center py-6">Loading tickets...</p>
      ) : filteredTickets.length === 0 ? (
        <p className="text-center py-6 text-gray-500">No tickets found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Ticket No</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">dueAt</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTickets.map((ticket, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3">{ticket.ticketNo}</td>
                  <td className="p-3">{ticket.title}</td>
                  <td className="p-3">{getStatusBadge(ticket.status)}</td>
                  <td className="p-3">{ticket.priority}</td>
                  <td className="p-3">
                    {new Date(ticket.reportedAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">
                    {new Date(ticket.dueAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl relative">
            <h2 className="text-lg font-bold mb-4 p-4 bg-gray-200 rounded-md">🎫 Ticket Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Ticket No", value: selectedTicket.ticketNo, icon: <FaHashtag /> },
                { label: "Title", value: selectedTicket.title, icon: <FaFileAlt /> },
                { label: "Description", value: selectedTicket.description, icon: <FaAlignLeft /> },
                { label: "Category", value: selectedTicket.category, icon: <FaTags /> },
                { label: "Priority", value: selectedTicket.priority, icon: <FaExclamationCircle /> },
                { label: "Status", value: selectedTicket.status, icon: <FaTasks /> },
                { label: "Department", value: selectedTicket.department, icon: <FaBuilding /> },
                { label: "Requester", value: selectedTicket.requester, icon: <FaUser /> },
                { label: "Assignee", value: selectedTicket.assignee || "Unassigned", icon: <FaUserTie /> },
                {
                  label: "Reported At",
                  value: new Date(selectedTicket.reportedAt).toLocaleString(),
                  icon: <FaClock />,
                },
                {
                  label: "Due At",
                  value: selectedTicket.dueAt
                    ? new Date(selectedTicket.dueAt).toLocaleString()
                    : "N/A",
                  icon: <FaCalendarAlt />,
                },
                {
                  label: "SLA Breached",
                  value: selectedTicket.slaBreached ? "Yes" : "No",
                  icon: <FaFlag />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 border rounded-lg shadow-sm bg-green-600"
                >
                  <div className="text-gray-50">{item.icon}</div>
                  <div className="bg-green-500 w-full p-2 rounded-lg">
                    <p className="text-xs text-gray-50 px-2">{item.label}</p>
                    <p className="font-medium text-gray-50 px-2">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedTicket(null)}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
