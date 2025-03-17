"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { quotes } from "../data/quotes";

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string>("");

  const moods = [
    { name: "happy", emoji: "😊" },
    { name: "sad", emoji: "😢" },
    { name: "angry", emoji: "😡" },
    { name: "tired", emoji: "🥱" },
    { name: "anxious", emoji: "😰" },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const moodQuotes = quotes[mood as keyof typeof quotes];
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    setQuote(moodQuotes[randomIndex]);
    // You can add API call here later when ready, now it's removed to keep static
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="bg-green-100 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-800">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600 mt-1">How are you feeling today?</p>
        <div className="flex justify-center gap-6 mt-4">
          {moods.map((mood) => (
            <motion.button
              key={mood.name}
              className={`text-4xl p-3 rounded-full ${
                selectedMood === mood.name
                  ? "bg-green-200 scale-110"
                  : "bg-white hover:bg-green-100"
              }`}
              onClick={() => handleMoodSelect(mood.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mood.emoji}
            </motion.button>
          ))}
        </div>
        {quote && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow text-green-800 text-lg">
            "{quote}"
          </div>
        )}
      </div>
      <div className="bg-white p-6 mt-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-green-800">Your Dashboard</h3>
        <p className="text-gray-500 text-sm">Mood Tracker (Last 7 Days)</p>
        <div className="h-40 bg-green-50 mt-4 rounded-lg flex items-center justify-center text-gray-400">
          Mood graph placeholder 📊
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Link href="/view-history">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            View History
          </button>
        </Link>
        <Link href="/chat">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Chat with Me
          </button>
        </Link>
      </div>
    </div>
  );
}
