
// import { useState, useEffect } from "react";
// import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

// export default function TicketTimeline() {
//   const [tickets, setTickets] = useState([]);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [holidays, setHolidays] = useState(new Map());

//   useEffect(() => {
//     setTickets([
//       {
//         ticketNo: "T-101",
//         title: "Donat Twerski",
//         source: "AirBnb",
//         cost: "456 EUR",
//         start: "2025-07-01",
//         end: "2025-07-03",
//       },
//       {
//         ticketNo: "T-102",
//         title: "Laquita Elliott",
//         source: "Booking.com",
//         cost: "1030 EUR",
//         start: "2025-07-02",
//         end: "2025-07-05",
//       },
//       {
//         ticketNo: "T-103",
//         title: "Emmalynn Mazzia",
//         source: "Booking.com",
//         cost: "1030 EUR",
//         start: "2025-07-02",
//         end: "2025-07-08",
//       },
//       {
//         ticketNo: "T-104",
//         title: "Jesús Moruga",
//         source: "Booking.com",
//         cost: "1030 EUR",
//         start: "2025-06-29",
//         end: "2025-07-02",
//       },
//     ]);
//   }, []);

//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const today = new Date();
//   const todayDay =
//     today.getFullYear() === year && today.getMonth() === month
//       ? today.getDate()
//       : null;

//   // fallback Kenya holidays
//   const fallbackHolidays = new Map([
//     ["1-1", "New Year"],
//     ["3-31", "Easter Monday"],
//     ["4-18", "Good Friday"],
//     ["5-1", "Labour Day"],
//     ["6-1", "Madaraka Day"],
//     ["6-7", "Idd ul-Fitr"],
//     ["10-10", "Huduma Day"],
//     ["10-20", "Mashujaa Day"],
//     ["12-12", "Jamhuri Day"],
//     ["12-25", "Christmas"],
//     ["12-26", "Boxing Day"],
//   ]);

//   useEffect(() => {
//     const fetchHolidays = async () => {
//       try {
//         const res = await fetch(
//           `https://date.nager.at/api/v3/PublicHolidays/${year}/KE`
//         );
//         if (!res.ok) throw new Error("Failed to fetch holidays");
//         const data = await res.json();
//         const dynamicHolidays = new Map(
//           data.map((h) => {
//             const d = new Date(h.date);
//             return [`${d.getMonth() + 1}-${d.getDate()}`, h.localName];
//           })
//         );
//         setHolidays(dynamicHolidays);
//       } catch {
//         setHolidays(fallbackHolidays);
//       }
//     };
//     fetchHolidays();
//   }, [year]);

//   const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
//     const d = new Date(year, month, i + 1);
//     const key = `${month + 1}-${i + 1}`;
//     return {
//       day: i + 1,
//       weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
//       month: d.toLocaleDateString("en-US", { month: "long" }),
//       isWeekend: d.getDay() === 0 || d.getDay() === 6,
//       isToday: todayDay === i + 1,
//       holidayName: holidays.get(key) || null,
//     };
//   });

//   const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
//   const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

//   const getBarStyle = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const startDay =
//       startDate.getMonth() === month ? startDate.getDate() : 1;
//     const endDay =
//       endDate.getMonth() === month ? endDate.getDate() : daysInMonth;
//     return { gridColumn: `${startDay + 1} / ${endDay + 2}` };
//   };

//   const groupedMonths = daysArray.reduce((acc, d) => {
//     if (!acc[d.month]) acc[d.month] = [];
//     acc[d.month].push(d);
//     return acc;
//   }, {});

//   const ticketsByGuest = tickets.reduce((acc, t) => {
//     if (!acc[t.title]) acc[t.title] = [];
//     acc[t.title].push(t);
//     return acc;
//   }, {});

//   const stackTickets = (guestTickets) =>
//     guestTickets
//       .map((t) => {
//         const start = new Date(t.start).getTime();
//         const end = new Date(t.end).getTime();
//         return { ...t, startTime: start, endTime: end };
//       })
//       .sort((a, b) => a.startTime - b.startTime)
//       .reduce((acc, ticket) => {
//         let level = 0;
//         while (
//           acc.some(
//             (placed) =>
//               placed.level === level &&
//               !(ticket.endTime < placed.startTime || ticket.startTime > placed.endTime)
//           )
//         ) {
//           level++;
//         }
//         acc.push({ ...ticket, level });
//         return acc;
//       }, []);

//   // Cell background depending on type (for row cells)
//   const getCellClass = (d) => {
//     if (d.holidayName) return "bg-yellow-200 text-yellow-900 border-l";
//     if (d.isWeekend) return "bg-blue-100 text-blue-700 border-l";
//     return "bg-gray-100 text-green-700 border-l";
//   };


//   return (
//     <div className="p-6 m-8 bg-white rounded-xl shadow-xl overflow-x-auto">
//       {/* Navigation */}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={prevMonth}
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           <FaArrowAltCircleLeft />
//         </button>
//         <h2 className="text-lg font-bold">
//           {currentDate.toLocaleString("default", {
//             month: "long",
//             year: "numeric",
//           })}
//         </h2>
//         <button
//           onClick={nextMonth}
//           className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           <FaArrowAltCircleRight />
//         </button>
//       </div>

//       {/* Calendar Grid */}
//       <div
//         className="overflow-x-auto relative bg-green-600 p-3 rounded-lg"
//         style={{ minWidth: "1000px" }}
//       >
//         <div
//           className="grid relative bg-gray-100 p-3 rounded-lg"
//           style={{ gridTemplateColumns: `200px repeat(${daysInMonth}, 1fr)` }}
//         >
//           {/* Today vertical line */}
//           {todayDay && (
//             <div
//               className="absolute top-0 bottom-0 w-[2px] bg-blue-600 z-30 pointer-events-none"
//               style={{ gridColumn: `${todayDay + 1} / ${todayDay + 2}` }}
//             ></div>
//           )}

//           {/* Header: Months */}
//           <div className="contents">
//             <div></div>
//             {Object.keys(groupedMonths).map((m, idx) => (
//               <div
//                 key={idx}
//                 className="text-center text-sm font-bold border-b bg-green-600  rounded-t-lg text-gray-100 p-4"
//                 style={{ gridColumn: `span ${groupedMonths[m].length}` }}
//               >
//                 {m} {year}
//               </div>
//             ))}
//           </div>

//           {/* Header: Weekdays */}
//           <div className="contents">
//             <div className="text-left pl-2 font-medium border-b">Guest</div>
//             {daysArray.map((d) => (
//               <div
//                 key={d.day}
//                 title={d.holidayName || ""}
//                 className={`text-center text-xs border-b ${
//                   d.isToday ? "bg-blue-600 text-gray-100 font-bold border-l rounded-r-md shadow-xl" : getCellClass(d)
//                 }`}
//               >
//                 {d.weekday}
//               </div>
//             ))}
//           </div>

//           {/* Header: Day Numbers */}
//           <div className="contents">
//             <div className="border-b"></div>
//             {daysArray.map((d) => (
//               <div
//                 key={d.day}
//                 title={d.holidayName || ""}
//                 className={`text-center text-xs border-b pb-2 mb-2 ${
//                   d.isToday ? "bg-blue-600 text-gray-100 font-bold border-l rounded-r-md shadow-xl" : getCellClass(d)
//                 }`}
//               >
//                 {d.day}
//               </div>
//             ))}
//           </div>

//           {/* Ticket Rows */}
//           {Object.keys(ticketsByGuest).map((guest, gi) => {
//             const stacked = stackTickets(ticketsByGuest[guest]);
//             const rowHeight = (Math.max(...stacked.map((t) => t.level)) + 1) * 28;

//             return (
//               <div
//                 key={gi}
//                 className="contents"
//                 style={{ height: `${rowHeight}px` }}
//               >
//                 {/* Guest info */}
//                 <div className="pr-2 text-sm text-gray-700 font-medium truncate flex flex-col justify-center border-b">
//                   <p>{guest}</p>
//                   <p className="text-xs text-gray-500">{stacked[0]?.source}</p>
//                 </div>

//                 {/* Guest row grid */}
//                 <div
//                   className="relative border-b"
//                   style={{
//                     gridColumn: `2 / ${daysInMonth + 2}`,
//                     display: "grid",
//                     gridTemplateColumns: `repeat(${daysInMonth}, 1fr)`,
//                   }}
//                 >
//                   {stacked.map((t, i) => (
//                     <div
//                       key={i}
//                       className="absolute h-6 rounded-lg text-white flex items-center px-2 text-xs shadow-md"
//                       style={{
//                         ...getBarStyle(t.start, t.end),
//                         backgroundColor: [
//                           "#27ae60",
//                           "#8e44ad",
//                           "#2980b9",
//                           "#e67e22",
//                         ][i % 4],
//                         top: `${t.level * 28}px`,
//                       }}
//                     >
//                       <div>
//                         <span className="font-semibold">{t.ticketNo}</span>{" "}
//                         <span className="ml-2 text-[10px]">{t.cost}</span>
//                       </div>
//                     </div>
//                   ))}

//                   {/* Background for each day */}
//                   {daysArray.map((d) => (
//                     <div
//                       key={d.day}
//                       title={d.holidayName || ""}
//                       className={`${getCellClass(d)}`}
//                     ></div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function TicketTimeline() {
  const [tickets, setTickets] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState(new Map());

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("https://6700c01a8368.ngrok-free.app/api/tickets/listTickets", {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        const data = await res.json();
        if (data.status === "00") {
          setTickets(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }
    };
    fetchTickets();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const todayDay =
    today.getFullYear() === year && today.getMonth() === month
      ? today.getDate()
      : null;

  // fallback Kenya holidays
  const fallbackHolidays = new Map([
    ["1-1", "New Year"],
    ["3-31", "Easter Monday"],
    ["4-18", "Good Friday"],
    ["5-1", "Labour Day"],
    ["6-1", "Madaraka Day"],
    ["6-7", "Idd ul-Fitr"],
    ["10-10", "Huduma Day"],
    ["10-20", "Mashujaa Day"],
    ["12-12", "Jamhuri Day"],
    ["12-25", "Christmas"],
    ["12-26", "Boxing Day"],
  ]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/KE`
        );
        if (!res.ok) throw new Error("Failed to fetch holidays");
        const data = await res.json();
        const dynamicHolidays = new Map(
          data.map((h) => {
            const d = new Date(h.date);
            return [`${d.getMonth() + 1}-${d.getDate()}`, h.localName];
          })
        );
        setHolidays(dynamicHolidays);
      } catch {
        setHolidays(fallbackHolidays);
      }
    };
    fetchHolidays();
  }, [year]);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(year, month, i + 1);
    const key = `${month + 1}-${i + 1}`;
    return {
      day: i + 1,
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      month: d.toLocaleDateString("en-US", { month: "long" }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      isToday: todayDay === i + 1,
      holidayName: holidays.get(key) || null,
    };
  });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getBarStyle = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startDay =
      startDate.getMonth() === month ? startDate.getDate() : 1;
    const endDay =
      endDate.getMonth() === month ? endDate.getDate() : daysInMonth;
    return { gridColumn: `${startDay + 1} / ${endDay + 2}` };
  };

  const groupedMonths = daysArray.reduce((acc, d) => {
    if (!acc[d.month]) acc[d.month] = [];
    acc[d.month].push(d);
    return acc;
  }, {});

  // ✅ Group tickets by department
  const ticketsByDept = tickets.reduce((acc, t) => {
    if (!acc[t.department]) acc[t.department] = [];
    acc[t.department].push(t);
    return acc;
  }, {});

  // Handle overlapping bars
  const stackTickets = (deptTickets) =>
    deptTickets
      .map((t) => {
        const start = new Date(t.reportedAt || t.dueAt).getTime();
        const end = new Date(
          t.closedAt || t.resolvedAt || t.dueAt || t.reportedAt
        ).getTime();
        return { ...t, startTime: start, endTime: end };
      })
      .sort((a, b) => a.startTime - b.startTime)
      .reduce((acc, ticket) => {
        let level = 0;
        while (
          acc.some(
            (placed) =>
              placed.level === level &&
              !(ticket.endTime < placed.startTime || ticket.startTime > placed.endTime)
          )
        ) {
          level++;
        }
        acc.push({ ...ticket, level });
        return acc;
      }, []);

  // Background classes
  const getCellClass = (d) => {
    if (d.holidayName) return "bg-yellow-200 text-yellow-900 border-l";
    if (d.isWeekend) return "bg-blue-100 text-blue-700 border-l";
    return "bg-gray-100 text-green-700 border-l";
  };

  return (
    <div className="p-6 m-8 bg-white rounded-xl shadow-xl overflow-x-auto">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <FaArrowAltCircleLeft />
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div
        className="overflow-x-auto relative p-3 rounded-lg"
        style={{ minWidth: "1000px" }}
      >
        <div
          className="grid relative bg-gray-100 p-3 rounded-lg"
          style={{ gridTemplateColumns: `200px repeat(${daysInMonth}, 1fr)` }}
        >
          {/* Today vertical line */}
          {todayDay && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-blue-600 z-30 pointer-events-none"
              style={{ gridColumn: `${todayDay + 1} / ${todayDay + 2}` }}
            ></div>
          )}

          {/* Header: Months */}
          <div className="contents">
            <div></div>
            {Object.keys(groupedMonths).map((m, idx) => (
              <div
                key={idx}
                className="text-center text-sm font-bold border-b bg-green-600 text-gray-100 p-4 rounded-t-lg"
                style={{ gridColumn: `span ${groupedMonths[m].length}` }}
              >
                {m} {year}
              </div>
            ))}
          </div>

          {/* Header: Weekdays */}
          <div className="contents">
            <div className="text-left pl-2 font-medium border-b bg-green-600 rounded-tl-lg p-2 text-gray-100">Department</div>
            {daysArray.map((d) => (
              <div
                key={d.day}
                title={d.holidayName || ""}
                className={`text-center text-xs border-b ${
                  d.isToday
                    ? "bg-blue-600 text-gray-100 font-bold border-l rounded-r-md shadow-xl"
                    : getCellClass(d)
                }`}
              >
                {d.weekday}
              </div>
            ))}
          </div>

          {/* Header: Day Numbers */}
          <div className="contents">
            <div className="border-b bg-green-200"></div>
            {daysArray.map((d) => (
              <div
                key={d.day}
                title={d.holidayName || ""}
                className={`text-center text-xs border-b pb-2 mb-2 ${
                  d.isToday
                    ? "bg-blue-600 text-gray-100 font-bold border-l rounded-r-md shadow-xl"
                    : getCellClass(d)
                }`}
              >
                {d.day}
              </div>
            ))}
          </div>

          {/* Ticket Rows by Department */}
          {Object.keys(ticketsByDept).map((dept, gi) => {
            const stacked = stackTickets(ticketsByDept[dept]);
            const rowHeight = (Math.max(...stacked.map((t) => t.level)) + 1) * 28;

            return (
              <div
                key={gi}
                className="contents"
                style={{ height: `${rowHeight}px` }}
              >
                {/* Department info */}
                <div className="pr-2 text-sm text-gray-700 font-medium truncate flex flex-col justify-center border-b bg-green-100 px-3 py-1">
                  <p>{dept}</p>
                  <p className="text-xs text-gray-500">{stacked.length} tickets</p>
                </div>

                {/* Ticket row grid */}
                <div
                  className="relative border-b"
                  style={{
                    gridColumn: `2 / ${daysInMonth + 2}`,
                    display: "grid",
                    gridTemplateColumns: `repeat(${daysInMonth}, 1fr)`,
                  }}
                >
                  {stacked.map((t, i) => (
                    <div
                      key={i}
                      className="absolute h-6 rounded-lg text-white flex items-center px-2 text-xs shadow-md"
                      style={{
                        ...getBarStyle(t.startTime, t.endTime),
                        backgroundColor: [
                          "#27ae60", // green
                          "#8e44ad", // purple
                          "#2980b9", // blue
                          "#e67e22", // orange
                        ][i % 4],
                        top: `${t.level * 28}px`,
                      }}
                    >
                      <div>
                        <span className="font-semibold">{t.ticketNo}</span>{" "}
                        <span className="ml-2 text-[10px]">{t.title}</span>
                      </div>
                    </div>
                  ))}

                  {/* Background for each day */}
                  {daysArray.map((d) => (
                    <div
                      key={d.day}
                      className={`${getCellClass(d)}`}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
