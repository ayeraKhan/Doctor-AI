// File: /app/view-history/page.tsx
"use client";

import { useEffect, useState } from "react";

type MedicalHistoryEntry = {
  condition: string;
  notes: string;
};

export default function ViewHistoryPage() {
  const [history, setHistory] = useState<MedicalHistoryEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.medicalHistory);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Medical History</h1>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry, idx) => (
            <li key={idx} className="bg-white p-4 rounded-lg shadow">
              <p><strong>Condition:</strong> {entry.condition}</p>
              <p><strong>Notes:</strong> {entry.notes}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No medical history found.</p>
      )}
    </div>
  );
}
