"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ user: "bot", text: "Hello! How can I help you today?" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // User message
    const newMessages = [...messages, { user: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Fake bot response (Replace with API call later)
    setTimeout(() => {
      setMessages([...newMessages, { user: "bot", text: "I'm here to support you 😊" }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold text-green-800">Chat with Doctor AI</h2>

      <div className="bg-white w-full max-w-lg p-4 mt-4 rounded-lg shadow-md">
        <div className="h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-2 rounded-lg ${msg.user === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className="bg-green-600 text-white p-2 rounded-r-lg">Send</button>
        </div>
      </div>
    </div>
  );
}
