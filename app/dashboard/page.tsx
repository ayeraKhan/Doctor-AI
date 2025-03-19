"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { quotes } from "../data/quotes";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<{ mood: string; note: string; date: string }[]>([]);
  const [note, setNote] = useState("");
  const [streak, setStreak] = useState(0);
  const [showInput, setShowInput] = useState(false);

  const moods = [
    { name: "happy", emoji: "😊" },
    { name: "sad", emoji: "😢" },
    { name: "angry", emoji: "😡" },
    { name: "tired", emoji: "🥱" },
    { name: "anxious", emoji: "😰" },
  ];

  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    setMoodHistory(savedMoods);

    const savedStreak = localStorage.getItem("moodStreak");
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  const handleMoodSelect = (mood: string) => {
    if (!note.trim()) return alert("Please enter a note before saving!");

    const moodQuotes = quotes[mood as keyof typeof quotes];
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    setQuote(moodQuotes[randomIndex]);

    const newMoodEntry = { mood, note, date: new Date().toLocaleString() };
    const lastMood = moodHistory[0]?.mood || null;

    let newStreak = mood === lastMood ? streak + 1 : 1;
    setStreak(newStreak);
    localStorage.setItem("moodStreak", newStreak.toString());

    const updatedHistory = [newMoodEntry, ...moodHistory].slice(0, 7);
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));

    setNote("");
    setShowInput(false);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="bg-green-100 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-800">Welcome to Your Dashboard</h2>
        <p className="text-gray-600 mt-1">How are you feeling today?</p>
        <div className="flex justify-center gap-6 mt-4">
          {moods.map((mood) => (
            <motion.button
              key={mood.name}
              className={`text-4xl p-3 rounded-full ${
                selectedMood === mood.name ? "bg-green-200 scale-110" : "bg-white hover:bg-green-100"
              }`}
              onClick={() => handleMoodSelect(mood.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mood.emoji}
            </motion.button>
          ))}
        </div>

        {/* Add Note Button */}
        <div className="mt-4">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
            >
              ➕ Add Note
            </button>
          ) : (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onBlur={() => setShowInput(false)}
            />
          )}
        </div>

        {quote && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow text-green-800 text-lg">
            "{quote}"
          </div>
        )}

        {/* Centered Buttons */}
        <div className="mt-6 flex justify-center gap-6">
          {/* Psychologist History Button (Redirects to Assessment) */}
          <Link href="/dashboard/assessment">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              🧠 Fill Psychologist History
            </button>
          </Link>

          {/* Medical History Button */}
          <Link href="/dashboard/medical-history">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              🏥 Add Medical History
            </button>
          </Link>
        </div>

        {/* Streak Counter */}
        <p className="text-green-800 font-bold mt-4">
          {streak > 1 ? `🔥 Streak: ${streak} days` : "Start your mood streak today!"}
        </p>
      </div>

      {/* Mood Graph */}
      <div className="bg-white p-6 mt-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-green-800">Mood Tracker (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={moodHistory}>
            <XAxis dataKey="date" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* View History & Chat */}
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
