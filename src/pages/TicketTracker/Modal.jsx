import React from "react";
import Tag from "./Tag";

export default function Modal({ ticket, onClose }) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">{ticket.title}</h2>
        <p className="text-gray-600">{ticket.description}</p>
        <div className="flex gap-2 mt-3">
          {ticket.tags.map((tag, idx) => (
            <Tag key={idx} label={tag.label} color={tag.color} />
          ))}
        </div>
        {ticket.dueDate && (
          <p className="text-sm text-gray-500">📅 Due: {ticket.dueDate}</p>
        )}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
