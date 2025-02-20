

"use client"
import { useState, useEffect, SetStateAction } from "react";

const MessageSection = () => {
  const [messages, setMessages] = useState([
    { role: "Admin", text: "Welcome to the sanitation management system!", timestamp: new Date().toLocaleTimeString() },
    { role: "Master", text: "Please ensure all bins are checked today.", timestamp: new Date().toLocaleTimeString() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isClient, setIsClient] = useState(false); // State to check if we're on the client side

  // Effect to set client state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update timestamps every second if on client
  useEffect(() => {
    const interval = setInterval(() => {
      if (isClient) {
        const updatedMessages = messages.map(msg => ({
          ...msg,
          timestamp: new Date().toLocaleTimeString(),
        }));
        setMessages(updatedMessages);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [messages, isClient]);

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        role: "Worker", // Assuming the user is a worker
        text: inputValue,
        timestamp: new Date().toLocaleTimeString(), // Set timestamp for the new message
      };
      setMessages([...messages, newMessage]);
      setInputValue(""); // Clear input after sending
    }
  };

  return (
    <div style={{ padding: "1rem", borderRadius: "8px", backgroundColor: "#fff9e6", border: "1px solid #ccc", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#007bff" }}>Message Board</h2>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem", border: "1px solid #007bff", borderRadius: "4px", padding: "0.5rem", backgroundColor: "#e6f7ff" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "4px", backgroundColor: msg.role === "Worker" ? "#fff" : "#e1f5fe", border: `1px solid ${msg.role === "Worker" ? "#ccc" : "#007bff"}` }}>
            <strong>{msg.role}:</strong> {msg.text} <em>({isClient ? msg.timestamp : 'Loading...'})</em>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #007bff", marginRight: "0.5rem" }}
        />
        <button
          onClick={handleSendMessage}
          style={{ backgroundColor: "#007bff", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageSection;
