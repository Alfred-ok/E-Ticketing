import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Ticket({
  ticket,
  stepIndex,
  steps,
  moveTicket,
  changeStatus,
  onViewMore,
  step,
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 space-y-2 border">
      <div className="flex justify-between items-center">
        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          {ticket.ticketNo}
        </span>
        <span className="text-xs text-gray-500">{step}</span>
      </div>

      <h3 className="font-semibold text-sm">{ticket.ticketName}</h3>
      <p className="text-xs text-gray-500">{ticket.ticketDescription}</p>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{ticket.priority}</span>
        <span>{ticket.assignedTo || "Unassigned"}</span>
      </div>

      {/* Status dropdown */}
      <div className="mt-2">
        <select
          value={ticket.statusId}
          onChange={(e) => changeStatus(ticket, e.target.value)}
          className="w-full text-sm border rounded p-1"
        >
          {steps.map((s) => (
            <option key={s.statusId} value={s.statusId}>
              {s.statusName}
            </option>
          ))}
        </select>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-1">
          {stepIndex > 0 && (
            <button
              onClick={() => moveTicket(ticket.ticketNo, stepIndex - 1)}
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <FaArrowLeft />
            </button>
          )}
          {stepIndex < steps.length - 1 && (
            <button
              onClick={() => moveTicket(ticket.ticketNo, stepIndex + 1)}
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              <FaArrowRight />
            </button>
          )}
        </div>

        <button
          onClick={() => onViewMore(ticket)}
          className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-600"
        >
          View
        </button>
      </div>
    </div>
  );
}
