// src/components/TaskBoard/TaskBoard.jsx

import React, { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

import Column from "./Column";
import AddStatusModal from "./AddStatusModal";

const user = JSON.parse(localStorage.getItem("user"));
const currentUserId = user?.userId ?? 14;

export default function TaskBoard() {
  const [statuses, setStatuses] = useState([]);
  const [ticketsByStatus, setTicketsByStatus] = useState({});
  const [reloadKey, setReloadKey] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatusName, setNewStatusName] = useState("");

  
  const savedResponse = JSON.parse(localStorage.getItem("loginResponse"));
  console.log(savedResponse);
  const departmentId = savedResponse?.data?.departmentId; //department Id
  const role = savedResponse?.data?.role; //role
  const userId = savedResponse?.data?.userId;

  console.log(departmentId, role, userId);

  // Fetch statuses
  useEffect(() => {
    async function fetchStatuses() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/statuses`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      const data = await res.json();
      setStatuses(data || []);
    }
    fetchStatuses();
  }, [reloadKey]);

  // Fetch tickets for each status
  useEffect(() => {
    async function fetchTickets() {
      const group = {};
      for (const s of statuses) {
        let url;

        if (role === "Admin" ) {
          // Use department-based API
          url = `${process.env.REACT_APP_API_URL}/api/tickets/bystatus/${s.statusId}/department/${departmentId}`;
        } else if(role === "user"){
          url =`${process.env.REACT_APP_API_URL}/api/tickets/bystatus/${s.statusId}/department/${departmentId}/requester/${userId }`
        }else {
          // Default API
          url = `${process.env.REACT_APP_API_URL}/api/tickets/bystatus/${s.statusId}`;
        }
        const res = await fetch(
          url,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        const json = await res.json();
        group[s.statusId] = json.data || [];
      }
      setTicketsByStatus(group);
    }
    if (statuses.length > 0) {
      fetchTickets();
    }
  }, [statuses, reloadKey]);

  // Fetch all users
  useEffect(() => {
    async function fetchAllUsers() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/Eticketing/getAllUsers`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      const json = await res.json();
      if (json.status === "00" && Array.isArray(json.data)) {
        setAllUsers(json.data);
      }
    }
    fetchAllUsers();
  }, []);

  // Map userId → display name
  const userMap = useMemo(() => {
    const m = {};
    allUsers.forEach((u) => {
      m[u.userId] =
        u.username || u.displayName || u.email || `#${u.userId}`;
    });
    return m;
  }, [allUsers]);

  // Assign ticket to one or more users + progress status to “In progress” (statusId = 2)
  async function assignTicket(ticket, assigneeIds) {
    for (const id of assigneeIds) {
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/tickets/assign/${ticket.ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            assigneeId: id,
            actorUserId: currentUserId,
          }),
        }
      );
    }
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/tickets/progress/${ticket.ticketId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          statusId: 2,
          actorUserId: currentUserId,
        }),
      }
    );
    setReloadKey((k) => k + 1);
  }

  // Move ticket to another status
  async function moveTicket(ticket, newStatusId) {
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/tickets/progress/${ticket.ticketId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          statusId: newStatusId,
          actorUserId: currentUserId,
        }),
      }
    );
    setReloadKey((k) => k + 1);
  }

  // Delete a status
  async function deleteStatus(statusId) {
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/statuses/deleteStatus/${statusId}`,
      { method: "DELETE" }
    );
    setReloadKey((k) => k + 1);
  }

  // Add a new status
  async function addStatus() {
    if (!newStatusName.trim()) return;
    await fetch(`${process.env.REACT_APP_API_URL}/api/statuses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        statusName: newStatusName,
        isTerminal: false,
      }),
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

      {showAddModal && (
        <AddStatusModal
          newStatusName={newStatusName}
          onNameChange={setNewStatusName}
          onClose={() => setShowAddModal(false)}
          onAdd={addStatus}
        />
      )}
    </div>
  );
}
