"use client";
import { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";

export default function Atten() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobileNumber: "",
    status: "",
    attendanceType: "Sworker",
    time: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Auto-update date & time
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setFormData((prevData) => ({ ...prevData, date: currentDate }));

    const updateTime = () => {
      const formattedTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setFormData((prevData) => ({ ...prevData, time: formattedTime }));
    };

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attendance Data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Left Side - Image */}
      <div className="w-1/2 h-screen relative">
        <img
          src="/attendanceimg.png"
          alt="Attendance"
          className="absolute w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg overflow-auto">
        <div className="flex flex-col items-center">
          <FaClipboardList size={60} className="text-blue-500 mb-4" />
          <h1 className="font-bold text-xl mb-4">Sanitation Attendance</h1>
        </div>

        {submitted ? (
          <div className="text-center p-4 bg-green-100 border border-green-400 rounded-lg text-green-800">
            <p>Attendance Recorded Successfully!</p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg text-lg"
            >
              Record Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Attendance Type */}
            <div>
              <label className="block text-sm font-medium">Attendance Type</label>
              <select
                name="attendanceType"
                value={formData.attendanceType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="Sworker">Sworker</option>
                <option value="Smaster">Smaster</option>
              </select>
            </div>

            {/* ID Field */}
            <div>
              <label className="block text-sm font-medium">ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
                placeholder="Enter ID"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter name"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter mobile number"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="On Duty">On Duty</option>
              </select>
            </div>

            {/* Date Field */}
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                disabled
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>

            {/* Time Field */}
            <div>
              <label className="block text-sm font-medium">Time</label>
              <input
                type="text"
                name="time"
                value={formData.time}
                disabled
                className="w-full p-2 border rounded-lg bg-gray-200"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 mt-4 rounded-lg text-lg"
            >
              Record Attendance
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
