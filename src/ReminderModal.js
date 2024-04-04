// import React, { useState } from "react";
// import axios from "axios";

// const ReminderModal = ({ onSave, onClose, taskId, taskText }) => {
//   const formatDateAndHour = () => {
//     const now = new Date();
//     const year = now.getUTCFullYear();
//     const month = (now.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth is 0-based
//     const day = now.getUTCDate().toString().padStart(2, "0");
//     const hour = now.getUTCHours().toString().padStart(2, "0");
//     return `${year}-${month}-${day}T${hour}:00:00.000+00:00`;
//   };

//   const [email, setEmail] = useState("");
//   const [reminderDateTime, setReminderDateTime] = useState(formatDateAndHour());

//   const handleSave = async () => {
//     console.log(taskText, taskId, reminderDateTime);
//     try {
//       const response = await axios.post(
//         "https://nodemailer-opal.vercel.app/api/sendreminder",
//         {
//           email,
//           reminderDateTime,
//           taskText,
//         }
//       );
//       console.log(response.data.msg);
//       onSave(email, reminderDateTime);
//       onClose();
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//       <div
//         className="bg-white p-6 rounded shadow-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email for reminder"
//           className="block w-full p-2 border rounded mb-2"
//         />
//         <input
//           type="datetime-local"
//           value={reminderDateTime}
//           onChange={(e) => setReminderDateTime(e.target.value)}
//           className="block w-full p-2 border rounded mb-4"
//         />
//         <div className="text-right">
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//           >
//             Save
//           </button>
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReminderModal;

import React, { useState } from "react";
import axios from "axios";

const ReminderModal = ({ onSave, onClose, taskId, taskText }) => {
  const [email, setEmail] = useState("");
  const [reminderDateTime, setReminderDateTime] = useState("");

  const handleSave = async () => {
    // Convert local datetime to UTC for consistent backend processing
    const userSelectedDate = new Date(reminderDateTime);
    const reminderDateTimeUtc = userSelectedDate.toISOString();

    try {
      const response = await axios.post(
        "https://nodemailer-opal.vercel.app/api/sendreminder",
        {
          email,
          reminderDateTime: reminderDateTimeUtc, // Use UTC datetime string
          taskText,
        }
      );
      console.log(response.data.msg);
      onSave(email, reminderDateTimeUtc); // Optionally, handle UI updates or cleanup
      onClose(); // Assuming you have a method to close the modal
    } catch (error) {
      console.error("Error:", error);
      // Handle error state in UI, such as showing a message to the user
    }
  };

  // Provides a default initial value for the datetime-local input,
  // formatted as a local datetime string to be converted upon submission
  const getDefaultDateTimeLocal = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust to local timezone offset
    return now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM', suitable for datetime-local input
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for reminder"
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="datetime-local"
          value={reminderDateTime || getDefaultDateTimeLocal()}
          onChange={(e) => setReminderDateTime(e.target.value)}
          className="block w-full p-2 border rounded mb-4"
        />
        <div className="text-right">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
