"use client";
import { useState } from "react";
import Link from "next/link";

const phqQuestions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself — or that you are a failure?",
  "Trouble concentrating on things, such as reading or watching TV?",
  "Moving or speaking so slowly or being restless that others notice?",
];

const gadQuestions = [
  "Feeling nervous, anxious, or on edge?",
  "Not being able to stop or control worrying?",
  "Worrying too much about different things?",
  "Trouble relaxing?",
  "Being so restless that it is hard to sit still?",
  "Becoming easily annoyed or irritable?",
  "Feeling afraid as if something awful might happen?",
];

const getTScore = (rawScore: number) => {
  const tScoreTable: { [key: number]: number } = {
    8: 37.1, 9: 43.3, 10: 46.2, 11: 48.2, 12: 49.8, 13: 51.2, 14: 52.3,
    15: 53.4, 16: 54.3, 17: 55.3, 18: 56.3, 19: 57.1, 20: 57.7, 21: 58.8,
    22: 59.7, 23: 60.7, 24: 61.6, 25: 62.5, 26: 63.5, 27: 64.4, 28: 65.3,
    29: 66.4, 30: 67.4, 31: 68.3, 32: 69.3, 33: 70.4, 34: 71.4, 35: 72.5,
    36: 73.6, 37: 74.8, 38: 75.9, 39: 77.0, 40: 81.1,
  };
  return tScoreTable[rawScore] || 0;
};

const interpretSeverity = (tScore: number) => {
  if (tScore < 55) return "None to slight";
  if (tScore < 60) return "Mild Depression";
  if (tScore < 70) return "Moderate Depression";
  return "Severe Depression";
};

const interpretAnxiety = (score: number) => {
  if (score <= 4) return "Minimal Anxiety";
  if (score <= 9) return "Mild Anxiety";
  if (score <= 14) return "Moderate Anxiety";
  return "Severe Anxiety";
};

const DepressionAnxietyForm = () => {
  const [depressionAnswers, setDepressionAnswers] = useState<number[]>(Array(8).fill(0));
  const [anxietyAnswers, setAnxietyAnswers] = useState<number[]>(Array(7).fill(0));
  const [phqScore, setPhqScore] = useState<number | null>(null);
  const [gadScore, setGadScore] = useState<number | null>(null);
  const [severity, setSeverity] = useState<string | null>(null);
  const [anxietyLevel, setAnxietyLevel] = useState<string | null>(null);

  const handleSubmit = () => {
    const rawPhqScore = depressionAnswers.reduce((sum, val) => sum + val, 0);
    const rawGadScore = anxietyAnswers.reduce((sum, val) => sum + val, 0);
    const tScore = getTScore(rawPhqScore);
    const severityLevel = interpretSeverity(tScore);
    const anxietySeverity = interpretAnxiety(rawGadScore);

    setPhqScore(tScore);
    setSeverity(severityLevel);
    setGadScore(rawGadScore);
    setAnxietyLevel(anxietySeverity);

    // ✅ Store results in localStorage for View History Page
    localStorage.setItem(
      "psychologistHistory",
      JSON.stringify({
        phq9: depressionAnswers,
        gad7: anxietyAnswers,
        phqScore: tScore,
        gadScore: rawGadScore,
        severity: severityLevel,
        anxietyLevel: anxietySeverity,
      })
    );
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Depression & Anxiety Assessment</h1>

      <h2 className="text-lg font-semibold">Depression (PHQ-9)</h2>
      {phqQuestions.map((question, i) => (
        <div key={i} className="mb-3">
          <label className="block text-gray-700">{question}</label>
          <select
            className="border p-2 rounded w-full"
            value={depressionAnswers[i]}
            onChange={(e) => {
              const newAnswers = [...depressionAnswers];
              newAnswers[i] = Number(e.target.value);
              setDepressionAnswers(newAnswers);
            }}
          >
            <option value="0">0 (None)</option>
            <option value="1">1 (Mild)</option>
            <option value="2">2 (Moderate)</option>
            <option value="3">3 (Severe)</option>
          </select>
        </div>
      ))}

      <h2 className="text-lg font-semibold mt-5">Anxiety (GAD-7)</h2>
      {gadQuestions.map((question, i) => (
        <div key={i} className="mb-3">
          <label className="block text-gray-700">{question}</label>
          <select
            className="border p-2 rounded w-full"
            value={anxietyAnswers[i]}
            onChange={(e) => {
              const newAnswers = [...anxietyAnswers];
              newAnswers[i] = Number(e.target.value);
              setAnxietyAnswers(newAnswers);
            }}
          >
            <option value="0">0 (None)</option>
            <option value="1">1 (Mild)</option>
            <option value="2">2 (Moderate)</option>
            <option value="3">3 (Severe)</option>
          </select>
        </div>
      ))}

      <button className="bg-blue-500 text-white p-2 rounded w-full mt-4" onClick={handleSubmit}>
        Calculate Score
      </button>

      {/* ✅ FIXED: Results Section is Now Inside the Return Statement */}
      {phqScore !== null && gadScore !== null && (
        <div className="mt-5 p-3 bg-gray-100 rounded border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800">Results</h3>
          <p className="text-gray-700">
            <strong>Depression:</strong> {severity} (T-Score: {phqScore})
          </p>
          <p className="text-gray-700">
            <strong>Anxiety:</strong> {anxietyLevel} (GAD-7 Score: {gadScore})
          </p>
        </div>
      )}

      {/* ✅ Back to Dashboard Button */}
      <Link href="/dashboard">
        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-700">
          ← Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default DepressionAnxietyForm;
