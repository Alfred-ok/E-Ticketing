import { useState, useEffect } from "react";
import axios from "axios";
import { Building2, Layers, User, AlertTriangle } from "lucide-react";

export default function CreateTicket() {
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [users, setUsers] = useState([]);

  const [requesterUserId, setRequesterUserId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priorityId, setPriorityId] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptRes = await axios.get(`${process.env.REACT_APP_API_URL}/departments`,{
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        if (deptRes.data?.status === "00") setDepartments(deptRes.data.data);

        const catRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`,{
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        setCategories(catRes.data);

        const priRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/priorities`,{
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        setPriorities(priRes.data);

        const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/Eticketing/getAllUsers`,{
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        if (userRes.data?.status === "00") setUsers(userRes.data.data);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title,
        description: desc,
        requesterUserId: parseInt(requesterUserId),
        departmentId: parseInt(departmentId),
        categoryId: parseInt(categoryId),
        priorityId: parseInt(priorityId),
        dueAt: "2025-09-01T17:00:00",
      };

      const resp = await axios.post(`${process.env.REACT_APP_API_URL}/api/tickets/issueTicket`,payload,{
        headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
           }
      });

      console.log(resp);


      setMessage("✅ Ticket created successfully!");
      setStep(1);
      setTitle("");
      setDesc("");
      setRequesterUserId("");
      setDepartmentId("");
      setCategoryId("");
      setPriorityId("");
    } catch (err) {
      console.error("Error creating ticket:", err);
      setMessage("❌ Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Updated: Added Summary to stepper
  const steps = [
    "Basic Details",
    "Requester Info",
    "Department",
    "Category",
    "Priority",
    "Summary",
  ];

  return (
    <div className="flex bg-gray-50 m-8 rounded-lg border-4 border-green-600 shadow-xl min-h-[550px]">
      {/* Sidebar Stepper */}
      <div className="w-64 bg-white shadow p-6 rounded-lg">
        <h2 className="font-bold text-lg mb-6">Create Ticket</h2>
        <ul className="space-y-4">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const active = step === stepNum;
            const completed = step > stepNum;
            return (
              <li
                key={idx}
                className={`flex items-center gap-3 ${
                  active ? "text-green-600 font-semibold" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full border ${
                    active
                      ? "bg-green-600 text-white"
                      : completed
                      ? "bg-green-300 text-white"
                      : "border-gray-400"
                  }`}
                >
                  {completed ? "✓" : stepNum}
                </div>
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Form Section */}
      <div className="flex-1 p-8 bg-green-600">
        <div className="bg-white shadow rounded-lg p-6">
          {message && <p className="mb-4 text-sm">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Details */}
            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-3 border rounded-lg border-green-600"
                  required
                />
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description"
                  className="w-full p-3 border rounded-lg border-green-600"
                  required
                />
              </>
            )}

            {/* Step 2: Requester Info */}
            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold mb-4">Requester Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.map((user) => (
                    <div
                      key={user.userId}
                      onClick={() => setRequesterUserId(user.userId)}
                      className={`p-4 flex flex-col items-center rounded-lg border cursor-pointer shadow-sm transition
                        ${requesterUserId == user.userId
                          ? "border-green-600 bg-green-500 text-white"
                          : "border-gray-300 hover:border-green-400"}`}
                    >
                      <User className={`w-8 h-8 mb-2 text-green-600  ${requesterUserId == user.userId ? " text-white" : " text-green-600"}`} />
                      <h4 className="font-medium">{user.displayName}</h4>
                      <p className={`text-sm ${requesterUserId == user.userId ? " text-white" : " text-green-600"}`}>{user.departmentName}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 3: Department */}
            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-4">Department</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departments.map((dept) => (
                    <div
                      key={dept.departmentId}
                      onClick={() => setDepartmentId(dept.departmentId)}
                      className={`p-4 flex flex-col items-center rounded-lg border cursor-pointer shadow-sm transition
                        ${departmentId === dept.departmentId
                          ? "border-green-600 bg-green-500 text-white"
                          : "border-gray-300 hover:border-green-400"}`}
                    >
                      <Building2 className={`w-8 h-8 mb-2 ${departmentId === dept.departmentId}? "text-white"
                          : "text-green-600"}`} />
                      <h4 className="font-medium">{dept.departmentName}</h4>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 4: Category */}
            {step === 4 && (
              <>
                <h3 className="text-lg font-semibold mb-4">Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.categoryId}
                      onClick={() => setCategoryId(cat.categoryId)}
                      className={`p-4 flex flex-col items-center rounded-lg border cursor-pointer shadow-sm transition
                        ${categoryId === cat.categoryId
                          ? "border-green-600 bg-green-500 text-white"
                          : "border-gray-300 hover:border-green-400"}`}
                    >
                      <Layers className={`w-8 h-8 mb-2 ${categoryId === cat.categoryId ? "text-white"
                          : "text-green-600" }`} />
                      <h4 className="font-medium">{cat.categoryName}</h4>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 5: Priority */}
            {step === 5 && (
              <>
                <h3 className="text-lg font-semibold mb-4">Priority</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {priorities.map((pri) => (
                    <div
                      key={pri.priorityId}
                      onClick={() => setPriorityId(pri.priorityId)}
                      className={`p-4 flex flex-col items-center rounded-lg border cursor-pointer shadow-sm transition
                        ${priorityId == pri.priorityId
                          ? "border-green-600 bg-green-500 text-white"
                          : "border-gray-300 hover:border-green-400"}`}
                    >
                      <AlertTriangle className={`w-8 h-8 mb-2 ${priorityId == pri.priorityId ? "text-white"
                          : "text-green-600" }"`}/>
                      <h4 className="font-medium">{pri.priorityName}</h4>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 6: Summary */}
            {step === 6 && (
              <>
                <div className="relative bg-white rounded-2xl shadow-xl border-4 border-green-600 max-w-full mx-auto overflow-hidden">
                  {/* Top bar */}
                  <div className="bg-green-600 text-white px-6 py-3 flex justify-between items-center">
                    <span className="font-bold text-lg">Support Ticket</span>
                    <span className="text-sm">{new Date().toLocaleDateString()}</span>
                  </div>

                  {/* Ticket content */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="text-lg font-semibold">
                          {departments.find((d) => d.departmentId == departmentId)?.departmentName}
                        </p>
                      </div>
                      {/* <div className="text-3xl font-bold text-green-600">→</div> */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Category</p>
                        <p className="text-lg font-semibold">
                          {categories.find((c) => c.categoryId == categoryId)?.categoryName}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-green-600 my-4" />

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Requester</p>
                        <p className="font-medium">
                          {users.find((u) => u.userId == requesterUserId)?.displayName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Priority</p>
                        <p className="font-medium">
                          {priorities.find((p) => p.priorityId == priorityId)?.priorityName}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Title</p>
                        <p className="font-medium">{title}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Description</p>
                        <p className="font-medium">{desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Perforated bottom */}
                  <div className="relative border-t border-dashed border-green-600 px-6 py-3 bg-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Ticket Ref</span>
                    <span className="font-semibold">#{Math.floor(Math.random() * 10000)}</span>
                  </div>

                  {/* Notches for ticket look */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-green-600 rounded-full border border-gray-200" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-green-600 rounded-full border border-gray-200" />
                </div>
              </>
            )}


            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Back
                </button>
              )}
              {step < steps.length && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Next
                </button>
              )}
              {step === steps.length && (
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Creating..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
