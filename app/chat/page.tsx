"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router
import ChatComponent from "../components/ChatComponent";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ user: "bot", text: "Hello! How can I help you today?" }]);
  const [input, setInput] = useState("");
  const router = useRouter(); // Initialize router

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { user: "user", text: input }];
    setMessages(newMessages);
    setInput("");
  
    try {
      const response = await fetch("http://192.168.1.8:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages([...newMessages, { user: "bot", text: data.response }]);
    } catch (error) {
      console.error("API error:", error);
      setMessages([...newMessages, { user: "bot", text: "Sorry, something went wrong." }]);
    }
  };
  

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Go back to the previous page
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mb-4"
      >
        ← Back
      </button>

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
          <button onClick={handleSend} className="bg-green-600 text-white p-2 rounded-r-lg">
            Send
          </button>
        </div>
        <ChatComponent />
      </div>
    </div>
  );
}
