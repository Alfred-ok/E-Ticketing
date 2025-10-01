import { useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Select from "react-select";
import UserBadge from "./UserBadge";
import TicketModal from "./TicketModal";

export default function Ticket({
  ticket, statusId, moveTicket, assignTicket,
  allUsers, userMap, statuses
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assigning, setAssigning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const userOptions = useMemo(
    () => (allUsers || []).map((u) => ({
      value: u.userId,
      label: u.username || u.displayName || u.email || `#${u.userId}`,
    })),
    [allUsers]
  );

  const assignedList = (ticket.assignees || []).map(
    (a) => a.username || a.displayName || userMap[a.userId] || a.userId
  );

  async function handleAssign(e) {
    e.stopPropagation();
    if (selectedUsers.length === 0) return;
    try {
      setAssigning(true);
      await assignTicket(ticket, selectedUsers.map((s) => s.value));
      setSelectedUsers([]);
      setExpanded(false);
    } finally {
      setAssigning(false);
    }
  }

  const currentIndex = statuses.findIndex((s) => s.statusId === statusId);
  const prevStatus = statuses[currentIndex - 1];
  const nextStatus = statuses[currentIndex + 1];

  return (
    <div className="bg-white p-3 mb-2 rounded-lg shadow-md border border-green-400 transition text-sm">
      <h4
        className="font-semibold text-gray-800 bg-gray-200 rounded-lg p-2 flex justify-between cursor-pointer"
        onClick={() => setExpanded((s) => !s)}
      >
        <div>
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

          <button
            onClick={() => setShowModal(true)}
            className="mt-3 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
          >
            View More
          </button>

          {statusId === 1 && (
            <div className="mt-3 border-t pt-2">
              <p className="text-xs text-gray-600 mb-1">Assign to user(s):</p>
              <Select
                isMulti
                options={userOptions}
                value={selectedUsers}
                onChange={(selected) => setSelectedUsers(selected || [])}
                placeholder="Select user(s)"
                classNamePrefix="reactselect"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />
              <button
                onClick={handleAssign}
                disabled={assigning || selectedUsers.length === 0}
                className={`mt-2 px-2 py-1 rounded text-xs text-white ${
                  assigning || selectedUsers.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {assigning ? "Assigning..." : "Assign & Move"}
              </button>
            </div>
          )}

          <div className="flex justify-between mt-3 bg-gray-100 p-2 rounded-lg">
            <button
              disabled={!prevStatus}
              onClick={() => moveTicket(ticket, prevStatus.statusId)}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                !prevStatus
                  ? "bg-gray-300 text-gray-600"
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
                  ? "bg-gray-300 text-gray-600"
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
