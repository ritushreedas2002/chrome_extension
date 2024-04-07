// import React, { useState } from "react";
// import axios from "axios";

// const ReminderModal = ({ onSave, onClose, taskId, taskText }) => {
//   const [email, setEmail] = useState("");
//   const [reminderDateTime, setReminderDateTime] = useState("");

//   const handleSave = async () => {
//     // Convert local datetime to UTC for consistent backend processing
//     const userSelectedDate = new Date(reminderDateTime);
//     const reminderDateTimeUtc = userSelectedDate.toISOString();

//     try {
//       const response = await axios.post(
//         "https://nodemailer-opal.vercel.app/api/sendreminder",
//         {
//           email,
//           reminderDateTime: reminderDateTimeUtc, // Use UTC datetime string
//           taskText,
//         }
//       );
//       console.log(response.data.msg);
//       onSave(email, reminderDateTimeUtc); // Optionally, handle UI updates or cleanup
//       onClose(); // Assuming you have a method to close the modal
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error state in UI, such as showing a message to the user
//     }
//   };

//   // Provides a default initial value for the datetime-local input,
//   // formatted as a local datetime string to be converted upon submission
//   const getDefaultDateTimeLocal = () => {
//     const now = new Date();
//     now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust to local timezone offset
//     return now.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:MM', suitable for datetime-local input
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
//           value={reminderDateTime || getDefaultDateTimeLocal()}
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


import React, { useState,useEffect } from "react";
import axios from "axios";

const ReminderModal = ({ onSave, onClose, taskId, taskText }) => {
  const [email, setEmail] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    setReminderDate(getDefaultDate());
    setReminderTime(getDefaultTime());
  }, []);

  const getDefaultDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
  };

  const getDefaultTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + (10 - now.getMinutes() % 10)); // Round up to the next closest 10-minute mark
    const hours = now.getHours() % 12 || 12; // Convert 24hr to 12hr format
    const minutes = now.getMinutes();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  // Function to generate 12-hour format time options with AM/PM
  const generateTimeOptions = () => {
    let times = [];
    for (let hour = 0; hour < 24; hour++) {
      // Convert 24-hour to 12-hour format
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const suffix = hour < 12 ? 'AM' : 'PM';
      for (let minute = 0; minute < 60; minute += 10) {
        const time = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${suffix}`;
        times.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return times;
  };

  const handleSave = async () => {
    // Check if reminderDate or reminderTime is empty to prevent invalid date construction
    if (!reminderDate || !reminderTime) {
      console.error("Date or time is not selected.");
      return; // Exit the function if either date or time is missing
    }
  
    try {
      // Convert 12-hour formatted time (with AM/PM) into 24-hour format
      const [_, hourPart, minutePart, period] = reminderTime.match(/(\d+):(\d+)\s?(AM|PM)/i) || [];
      let hour = parseInt(hourPart, 10);
      const minutes = parseInt(minutePart, 10);
  
      if (period.toUpperCase() === "PM" && hour < 12) {
        hour += 12;
      } else if (period.toUpperCase() === "AM" && hour === 12) {
        hour = 0;
      }
  
      // If hour or minutes are invalid (NaN), log an error and return
      if (isNaN(hour) || isNaN(minutes)) {
        console.error("Invalid time format.");
        return;
      }
  
      // Construct the full datetime string in ISO format
      const datetime = new Date(`${reminderDate}T${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      if (isNaN(datetime.getTime())) {
        throw new Error("Invalid datetime value");
      }
  
      const reminderDateTimeUtc = datetime.toISOString();
  
      const response = await axios.post(
        "https://nodemailer-opal.vercel.app/api/sendreminder",
        {
          email,
          reminderDateTime: reminderDateTimeUtc,
          taskText,
        }
      );
  
      console.log(response.data.msg);
      onSave(email, reminderDateTimeUtc);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  // const getDefaultDate = () => {
  //   const now = new Date();
  //   return now.toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
  // };

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
          type="date"
          value={reminderDate || getDefaultDate()}
          onChange={(e) => setReminderDate(e.target.value)}
          className="block w-full p-2 border rounded mb-2"
        />
        <select
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="block w-full p-2 border rounded mb-4"
        >
          {generateTimeOptions()}
        </select>
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


