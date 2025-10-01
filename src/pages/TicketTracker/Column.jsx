import { FaTrash } from "react-icons/fa";
import Ticket from "./Ticket";

export default function Column({
  statusName, statusId, tickets,
  moveTicket, assignTicket, deleteStatus,
  allUsers, userMap, statuses
}) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-2xl p-4 min-w-[250px] min-h-[300px] flex flex-col ">
      <div className="flex justify-between items-center mb-4 bg-green-600 p-3 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-green-100">{statusName}</h3>
        <button onClick={() => deleteStatus(statusId)} className="text-red-50 hover:text-red-600">
          <FaTrash />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {tickets.map((ticket) => (
          <Ticket
            key={ticket.ticketId}
            ticket={ticket}
            statusId={statusId}
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
