"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MoodEntry = {
  mood: string;
  note: string;
  date: string;
};

type MedicalHistory = {
  age?: string;
  weight?: string;
  height?: string;
  allergies?: string;
  medications?: string;
  medicalConditions?: string;
  surgeries?: string;
  smoking?: string;
  familyHistory?: string;
  exercise?: string;
  diet?: string;
};

export default function ViewHistoryPage() {
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({});
  const [psychologistHistory, setPsychologistHistory] = useState<{ phq9: number[]; gad7: number[] }>({
    phq9: [],
    gad7: [],
  });

  const router = useRouter();

  useEffect(() => {
    // ✅ Load Mood History
    const savedMoods = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    setHistory(Array.isArray(savedMoods) ? savedMoods : []);

    // ✅ Load Medical History
    const savedMedicalHistory = JSON.parse(localStorage.getItem("medicalHistory") || "{}");
    setMedicalHistory(typeof savedMedicalHistory === "object" ? savedMedicalHistory : {});

    // ✅ Load Psychologist History
    const storedPsychHistory = JSON.parse(localStorage.getItem("psychologistHistory") || "{}");
    setPsychologistHistory(
      storedPsychHistory && typeof storedPsychHistory === "object"
        ? {
            phq9: Array.isArray(storedPsychHistory.phq9) ? storedPsychHistory.phq9 : [],
            gad7: Array.isArray(storedPsychHistory.gad7) ? storedPsychHistory.gad7 : [],
          }
        : { phq9: [], gad7: [] }
    );
  }, []);

  // ✅ Function to get severity label
  const getSeverityLabel = (score: number, type: "phq9" | "gad7") => {
    let severity = "";
    let color = "text-gray-700";

    if (type === "phq9") {
      if (score <= 4) { severity = "Minimal"; color = "text-green-600"; }
      else if (score <= 9) { severity = "Mild"; color = "text-yellow-500"; }
      else if (score <= 14) { severity = "Moderate"; color = "text-orange-500"; }
      else if (score <= 19) { severity = "Moderately Severe"; color = "text-red-500"; }
      else { severity = "Severe"; color = "text-red-700"; }
    } else {
      if (score <= 4) { severity = "Minimal"; color = "text-green-600"; }
      else if (score <= 9) { severity = "Mild"; color = "text-yellow-500"; }
      else if (score <= 14) { severity = "Moderate"; color = "text-orange-500"; }
      else { severity = "Severe"; color = "text-red-700"; }
    }

    return <span className={`font-bold ${color}`}>{severity}</span>;
  };

  // ✅ Ensure scores are only calculated if data exists
  const phq9Score = psychologistHistory.phq9?.length ? psychologistHistory.phq9.reduce((sum, val) => sum + val, 0) : null;
  const gad7Score = psychologistHistory.gad7?.length ? psychologistHistory.gad7.reduce((sum, val) => sum + val, 0) : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="fixed bottom-4 left-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        ← Back to Dashboard
      </button>

      {/* 🟢 Mood History Section */}
      <h1 className="text-2xl font-bold mb-4">Your Mood History</h1>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry, idx) => (
            <li key={idx} className="bg-white p-4 rounded-lg shadow">
              <p><strong>Mood:</strong> {entry.mood}</p>
              <p><strong>Note:</strong> {entry.note}</p>
              <p><strong>Date:</strong> {entry.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No mood history found.</p>
      )}

      {/* 🟢 Medical History Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Your Medical History</h1>
      {Object.keys(medicalHistory).length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <p><strong>Age:</strong> {medicalHistory.age || "Not provided"}</p>
          <p><strong>Weight:</strong> {medicalHistory.weight ? `${medicalHistory.weight} kg` : "Not provided"}</p>
          <p><strong>Height:</strong> {medicalHistory.height ? `${medicalHistory.height} cm` : "Not provided"}</p>
          <p><strong>Allergies:</strong> {medicalHistory.allergies || "None"}</p>
          <p><strong>Medications:</strong> {medicalHistory.medications || "None"}</p>
          <p><strong>Medical Conditions:</strong> {medicalHistory.medicalConditions || "None"}</p>
          <p><strong>Surgeries:</strong> {medicalHistory.surgeries || "None"}</p>
          <p><strong>Smoking:</strong> {medicalHistory.smoking || "Not specified"}</p>
          <p><strong>Family History:</strong> {medicalHistory.familyHistory || "None"}</p>
          <p><strong>Exercise:</strong> {medicalHistory.exercise || "Not specified"}</p>
          <p><strong>Diet:</strong> {medicalHistory.diet || "Not specified"}</p>
        </div>
      ) : (
        <p className="text-gray-600">No medical history found.</p>
      )}

      {/* 🟢 Psychologist History Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Your Psychologist History</h1>
      {phq9Score !== null || gad7Score !== null ? (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          {/* PHQ-9 Score */}
          {phq9Score !== null && (
            <div>
              <h2 className="text-xl font-semibold">PHQ-9 (Depression) Score</h2>
              <p className="text-lg">Total Score: <span className="font-bold">{phq9Score}</span></p>
              <p>Severity: {getSeverityLabel(phq9Score, "phq9")}</p>
            </div>
          )}

          {/* GAD-7 Score */}
          {gad7Score !== null && (
            <div>
              <h2 className="text-xl font-semibold">GAD-7 (Anxiety) Score</h2>
              <p className="text-lg">Total Score: <span className="font-bold">{gad7Score}</span></p>
              <p>Severity: {getSeverityLabel(gad7Score, "gad7")}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">No psychologist history found.</p>
      )}
    </div>
  );
}
