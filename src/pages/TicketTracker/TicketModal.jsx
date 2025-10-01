import {
  FaHashtag, FaFileAlt, FaAlignLeft, FaTags, FaExclamationCircle,
  FaTasks, FaBuilding, FaUser, FaUserTie, FaClock,
  FaCalendarAlt, FaFlag
} from "react-icons/fa";

export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  const fields = [
    { label: "Ticket No", value: ticket.ticketNo, icon: <FaHashtag /> },
    { label: "Title", value: ticket.title, icon: <FaFileAlt /> },
    { label: "Description", value: ticket.description, icon: <FaAlignLeft /> },
    { label: "Category", value: ticket.category, icon: <FaTags /> },
    { label: "Priority", value: ticket.priority, icon: <FaExclamationCircle /> },
    { label: "Status", value: ticket.status, icon: <FaTasks /> },
    { label: "Department", value: ticket.department, icon: <FaBuilding /> },
    { label: "Requester", value: ticket.requester, icon: <FaUser /> },
    { label: "Assignee", value: ticket.assignee || "Unassigned", icon: <FaUserTie /> },
    { label: "Reported At", value: new Date(ticket.reportedAt).toLocaleString(), icon: <FaClock /> },
    { label: "Due At", value: ticket.dueAt ? new Date(ticket.dueAt).toLocaleString() : "N/A", icon: <FaCalendarAlt /> },
    { label: "Resolved At", value: ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleString() : "Not resolved", icon: <FaCalendarAlt /> },
    { label: "Closed At", value: ticket.closedAt ? new Date(ticket.closedAt).toLocaleString() : "Not closed", icon: <FaCalendarAlt /> },
    { label: "SLA Breached", value: ticket.slaBreached ? "Yes" : "No", icon: <FaFlag /> },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] overflow-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl relative">
        <h2 className="text-lg font-bold mb-4 p-4 bg-gray-200 rounded-md flex justify-between items-center">
          🎫 Ticket Details
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {fields.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg shadow-sm bg-green-600">
              <div className="text-gray-50">{item.icon}</div>
              <div className="bg-green-500 w-full p-2 rounded-lg">
                <p className="text-xs text-gray-50 px-2">{item.label}</p>
                <p className="font-medium text-gray-50 px-2">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
