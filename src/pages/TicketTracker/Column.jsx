import React from "react";
import Ticket from "./Ticket";

export default function Column({ step, tickets, stepIndex, steps, moveTicket, onViewMore, assignTicket }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 w-72 min-h-[500px] flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-green-800">{step}</h3>
      <div className="flex-1 overflow-y-auto">
        {tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            stepIndex={stepIndex}
            steps={steps}
            moveTicket={moveTicket}
            onViewMore={onViewMore}
            step={step}
            assignTicket={assignTicket}
          />
        ))}
      </div>
    </div>
  );
}
