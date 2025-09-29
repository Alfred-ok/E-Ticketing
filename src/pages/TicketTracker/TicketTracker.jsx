
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
  FaTrash, FaArrowLeft, FaArrowRight, FaPlus
} from "react-icons/fa";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select"; // npm i react-select



const user = JSON.parse(localStorage.getItem("user"));
const currentUserId = user?.userId ?? 14; // logged-in userId

// --- small badge for assigned users ---
function UserBadge({ name }) {
  return (
    <span className="inline-block text-xs mr-1 mb-1 px-2 py-0.5 rounded-full bg-green-700 text-white">
      {name}
    </span>
  );
}

// --- Ticket Card ---
function Ticket({
  ticket,
  statusId,
  statusName,
  moveTicket,
  assignTicket,
  allUsers,
  userMap,
  statuses,
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assigning, setAssigning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const userOptions = useMemo(
    () =>
      (allUsers || []).map((u) => ({
        value: u.userId,
        label: u.username || u.displayName || u.email || `#${u.userId}`,
      })),
    [allUsers]
  );

  
  const getAssignedList = () => {
    if (!ticket) return [];
    const arr =
      ticket.assignees ||
      ticket.assignedUsers ||
      ticket.assigneeIds ||
      ticket.assigned ||
      [];
    if (arr.length === 0) return [];
    if (typeof arr[0] === "object") {
      return arr.map(
        (a) => a.username || a.displayName || userMap[a.userId] || a.userId
      );
    } else {
      return arr.map((id) => userMap[id] || `#${id}`);
    }
  };
  const assignedList = getAssignedList();

  async function handleAssign(e) {
    e.stopPropagation();
    if (!selectedUsers || selectedUsers.length === 0) return;
    const ids = selectedUsers.map((s) => s.value);
    try {
      setAssigning(true);
      await assignTicket(ticket, ids);
      setSelectedUsers([]);
      setExpanded(false);
    } catch (err) {
      console.error("Assign failed", err);
    } finally {
      setAssigning(false);
    }
  }

  // find index of current status
  const currentIndex = statuses.findIndex((s) => s.statusId === statusId);
  const prevStatus = currentIndex > 0 ? statuses[currentIndex - 1] : null;
  const nextStatus =
    currentIndex < statuses.length - 1 ? statuses[currentIndex + 1] : null;

  return (
    <div className="bg-white p-3 mb-2 rounded-lg shadow-md border border-green-400 transition text-sm">
      <h4
        className={`font-semibold text-gray-800 bg-gray-200 rounded-lg p-2 text-sm flex justify-between items-center cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          setExpanded((s) => !s);
        }}
      >
        <div className="flex flex-col">
          <span>{ticket.title}</span>
          {assignedList.length > 0 && (
            <div className="mt-1 flex flex-wrap">
              {assignedList.map((n, i) => (
                <UserBadge key={i} name={n} />
              ))}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-600">{ticket.dueDate || ""}</div>
      </h4>

      {expanded && (
        <>
          <div className="mt-3 text-gray-700">{ticket.description}</div>

          {/* View More */}
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
            >
              View More
            </button>
          </div>

          {/* Assign Section */}
          {statusId === 1 && (
            <div className="mt-3 border-t pt-2">
              <p className="text-xs text-gray-600 mb-1">Assign to user(s):</p>
              <div className="flex flex-col gap-2">
                <Select
                  isMulti
                  options={userOptions}
                  value={selectedUsers}
                  onChange={(selected) => setSelectedUsers(selected || [])}
                  placeholder="Select user(s)"
                  className="text-sm"
                  classNamePrefix="reactselect"
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAssign}
                    disabled={assigning || selectedUsers.length === 0}
                    className={`px-2 py-1 rounded text-xs text-white ${
                      assigning || selectedUsers.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {assigning ? "Assigning..." : "Assign & Move"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Move Buttons (left/right arrows) */}
          <div
            className="flex justify-between items-center mt-3 bg-gray-100 p-2 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              disabled={!prevStatus}
              onClick={() => moveTicket(ticket, prevStatus.statusId)}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                !prevStatus
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <FaArrowLeft /> {prevStatus?.statusName}
            </button>
            <button
             disabled={!nextStatus}
              onClick={() => moveTicket(ticket, nextStatus.statusId)}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                !nextStatus
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {nextStatus?.statusName} <FaArrowRight />
            </button>
          </div>
        </>
      )}

      {showModal && (
        <TicketModal ticket={ticket} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

// --- Column ---
function Column({
  statusName,
  statusId,
  tickets,
  moveTicket,
  assignTicket,
  deleteStatus,
  allUsers,
  userMap,
  statuses,
}) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-2xl p-4 min-w-[250px] min-h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-4 bg-green-600 p-3 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-green-100">{statusName}</h3>
        <button
          onClick={() => deleteStatus(statusId)}
          className="text-red-50 hover:text-red-600"
        >
          <FaTrash />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {tickets.map((ticket) => (
          <Ticket
            key={ticket.ticketId}
            ticket={ticket}
            statusId={statusId}
            statusName={statusName}
            moveTicket={moveTicket}
            assignTicket={assignTicket}
            allUsers={allUsers}
            userMap={userMap}
            statuses={statuses}
          />
        ))}
      </div>
    </div>
  );
}

// --- Main Board ---
export default function TaskBoard() {
  const [statuses, setStatuses] = useState([]);
  const [ticketsByStatus, setTicketsByStatus] = useState({});
  const [reloadKey, setReloadKey] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatusName, setNewStatusName] = useState("");

  // fetch statuses
  useEffect(() => {
    async function fetchStatuses() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/statuses`,{
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      const data = await res.json();
      setStatuses(data || []);
    }
    fetchStatuses();
  }, [reloadKey]);

  // fetch tickets
  useEffect(() => {
    async function fetchTickets() {
      const ticketsData = {};
      for (const s of statuses) {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/tickets/bystatus/${s.statusId}`,{
            headers: {
              "ngrok-skip-browser-warning": "true"
            }
          }
        );
        const json = await res.json();
        ticketsData[s.statusId] = json.data || [];
      }
      setTicketsByStatus(ticketsData);
    }
    if (statuses.length > 0) fetchTickets();
  }, [statuses, reloadKey]);

  // fetch all users
  useEffect(() => {
    async function fetchAllUsers() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/Eticketing/getAllUsers`,{
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );
      const json = await res.json();
      if (json.status === "00" && Array.isArray(json.data)) {
        setAllUsers(json.data);
      }
    }
    fetchAllUsers();
  }, []);

  console.log(allUsers);

  const userMap = useMemo(() => {
    const map = {};
    allUsers.forEach((u) => {
      map[u.userId] =
        u.username || u.displayName || `${u.email}` || `#${u.userId}`;
    });
    return map;
  }, [allUsers]);

  console.log(currentUserId);

  async function assignTicket(ticket, assigneeIds) {
    for (const id of assigneeIds) {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/tickets/assign/${ticket.ticketId}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
           },
          body: JSON.stringify({ assigneeId: id, actorUserId: currentUserId }),
        }
      );
    }

    await fetch(
      `${process.env.REACT_APP_API_URL}/api/tickets/progress/${ticket.ticketId}`,
      {
        method: "PUT",
       headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
           },
        body: JSON.stringify({ statusId: 2, actorUserId: currentUserId }),
      }
    );
    
    setReloadKey((k) => k + 1);
  }

  async function moveTicket(ticket, newStatusId) {
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/tickets/progress/${ticket.ticketId}`,
      {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
           },
        body: JSON.stringify({ statusId: newStatusId, actorUserId: currentUserId }),
      }
    );
    setReloadKey((k) => k + 1);
  }

  async function deleteStatus(statusId) {
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/statuses/deleteStatus/${statusId}`,
      { method: "DELETE" }
    );
    setReloadKey((k) => k + 1);
  }

  async function addStatus() {
    if (!newStatusName.trim()) return;
    await fetch(`${process.env.REACT_APP_API_URL}/api/statuses`, {
      method: "POST",
      headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
           },
      body: JSON.stringify({ statusName: newStatusName, isTerminal: false }),
    });
    setNewStatusName("");
    setShowAddModal(false);
    setReloadKey((k) => k + 1);
  }

  return (
    <div className="m-8 bg-green-600 rounded-xl px-4 pt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold mx-2 px-3">
          Ticket Categories
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3 py-2 bg-white text-green-700 rounded shadow hover:bg-gray-100"
        >
          <FaPlus /> Add Column
        </button>
      </div>

      <div className="flex justify-start py-4 bg-green-600 w-full min-h-screen overflow-x-auto rounded-md shadow-xl space-x-3">
        {statuses.map((s) => (
          <Column
            key={s.statusId}
            statusName={s.statusName}
            statusId={s.statusId}
            tickets={ticketsByStatus[s.statusId] || []}
            moveTicket={moveTicket}
            assignTicket={assignTicket}
            deleteStatus={deleteStatus}
            allUsers={allUsers}
            userMap={userMap}
            statuses={statuses}
          />
        ))}
      </div>

      {/* Add Status Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Add New Status
            </h2>
            <input
              type="text"
              value={newStatusName}
              onChange={(e) => setNewStatusName(e.target.value)}
              placeholder="Status Name"
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addStatus}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// // --- Modal Component ---
// function TicketModal({ ticket, onClose }) {
//   if (!ticket) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
//       <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto p-6">
//         <h2 className="text-xl font-bold mb-4 text-green-700">
//           Ticket Details
//         </h2>
//         <div className="space-y-2 text-sm">
//           <p><strong>Ticket No:</strong> {ticket.ticketNo}</p>
//           <p><strong>Title:</strong> {ticket.title}</p>
//           <p><strong>Description:</strong> {ticket.description}</p>
//           <p><strong>Category:</strong> {ticket.category}</p>
//           <p><strong>Priority:</strong> {ticket.priority}</p>
//           <p><strong>Status:</strong> {ticket.status}</p>
//           <p><strong>Department:</strong> {ticket.department}</p>
//           <p><strong>Requester:</strong> {ticket.requester}</p>
//           <p><strong>Assignee:</strong> {ticket.assignee || "Unassigned"}</p>
//           <p><strong>Reported At:</strong> {ticket.reportedAt}</p>
//           <p><strong>Due At:</strong> {ticket.dueAt}</p>
//           <p><strong>Resolved At:</strong> {ticket.resolvedAt || "Not resolved"}</p>
//           <p><strong>Closed At:</strong> {ticket.closedAt || "Not closed"}</p>
//           <p><strong>SLA Breached:</strong> {ticket.slaBreached ? "Yes" : "No"}</p>
//         </div>
//         <div className="flex justify-end mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


function TicketModal({ ticket, onClose }) {
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
    {
      label: "Reported At",
      value: new Date(ticket.reportedAt).toLocaleString(),
      icon: <FaClock />,
    },
    {
      label: "Due At",
      value: ticket.dueAt ? new Date(ticket.dueAt).toLocaleString() : "N/A",
      icon: <FaCalendarAlt />,
    },
    {
      label: "Resolved At",
      value: ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleString() : "Not resolved",
      icon: <FaCalendarAlt />,
    },
    {
      label: "Closed At",
      value: ticket.closedAt ? new Date(ticket.closedAt).toLocaleString() : "Not closed",
      icon: <FaCalendarAlt />,
    },
    {
      label: "SLA Breached",
      value: ticket.slaBreached ? "Yes" : "No",
      icon: <FaFlag />,
    },
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
      </div>
    </div>
  );
}

