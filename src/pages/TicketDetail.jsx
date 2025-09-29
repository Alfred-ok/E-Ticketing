import { useParams } from "react-router-dom";
import { tickets } from "../data/tickets";

export default function TicketDetail() {
  const { id } = useParams();
  const ticket = tickets.find(t => t.id === parseInt(id));

  if (!ticket) return <p>Ticket not found.</p>;

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Created:</strong> {ticket.createdAt}</p>
      <p className="mt-4">{ticket.description}</p>
    </div>
  );
}
