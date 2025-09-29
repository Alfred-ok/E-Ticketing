import { useEffect, useState, useCallback } from "react";
import Ticket from "./Ticket";
import { FaPlus } from "react-icons/fa";

export default function TaskBoard() {
  const [statuses, setStatuses] = useState([]);
  const [ticketsByStatus, setTicketsByStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch statuses + tickets
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.1.253:8594/api/statuses");
      const statusData = await res.json();
      setStatuses(statusData);

      const ticketData = {};
      for (const status of statusData) {
        const res = await fetch(
          `http://192.168.1.253:8594/api/tickets/bystatus/${status.statusId}`
        );
        const json = await res.json();
        ticketData[status.statusId] = json.data || [];
      }
      setTicketsByStatus(ticketData);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Move ticket with ← →
  const moveTicket = async (ticketNo, targetIndex) => {
    if (targetIndex < 0 || targetIndex >= statuses.length) return;
    const targetStatusId = statuses[targetIndex].statusId;
    await updateStatus(ticketNo, targetStatusId);
  };

  // ✅ Change status (dropdown)
  const changeStatus = async (ticket, newStatusId) => {
    if (parseInt(newStatusId) === 2) {
      // Special case: assign when moving to status 2 ("New")
      try {
        await fetch(
          `http://192.168.1.253:8594/api/tickets/assign/${ticket.ticketNo}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assigneeId: 12,
              actorUserId: 12,
            }),
          }
        );
        console.log(
          `Ticket ${ticket.ticketNo} assigned when moved to status 2`
        );
      } catch (err) {
        console.error("Error assigning ticket:", err);
      }
    } else {
      await updateStatus(ticket.ticketNo, newStatusId);
    }

    fetchData(); // Refresh board
  };

  // ✅ Helper to update status
  const updateStatus = async (ticketNo, statusId) => {
    try {
      await fetch(
        `http://192.168.1.253:8594/api/tickets/updatestatus/${ticketNo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statusId }),
        }
      );
      console.log(`Ticket ${ticketNo} moved to status ${statusId}`);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p className="text-center py-4">Loading board...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
      {statuses.map((status, idx) => (
        <div
          key={status.statusId}
          className="bg-gray-100 rounded-xl shadow-md flex flex-col"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between bg-gray-200 p-3 rounded-t-xl">
            <h2 className="font-semibold text-sm">{status.statusName}</h2>
            <button className="text-blue-500 hover:text-blue-700">
              <FaPlus />
            </button>
          </div>

          {/* Column Body */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[70vh]">
            {ticketsByStatus[status.statusId]?.length > 0 ? (
              ticketsByStatus[status.statusId].map((ticket) => (
                <Ticket
                  key={ticket.ticketNo}
                  ticket={ticket}
                  stepIndex={idx}
                  steps={statuses}
                  moveTicket={moveTicket}
                  changeStatus={changeStatus}
                  onViewMore={(t) => alert(`View ticket ${t.ticketNo}`)}
                  step={status.statusName}
                />
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No tickets</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
