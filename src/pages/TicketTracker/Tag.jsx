
import React from "react";

export default function Tag({ label, color }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: color, color: "white" }}
    >
      {label}
    </span>
  );
}
