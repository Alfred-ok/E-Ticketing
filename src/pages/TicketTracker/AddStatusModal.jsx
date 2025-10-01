// src/components/TaskBoard/AddStatusModal.jsx

export default function AddStatusModal({
  newStatusName,
  onNameChange,
  onClose,
  onAdd,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-bold mb-4 text-green-700">
          Add New Status
        </h2>
        <input
          type="text"
          value={newStatusName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Status Name"
          className="w-full border p-2 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onAdd} className="px-4 py-2 bg-green-600 text-white rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
