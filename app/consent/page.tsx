"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const questions = [
  "Do you have any chronic illnesses?",
  "Are you currently taking any medications?",
  "Do you have allergies?",
  "Have you had any surgeries before?",
  "Do you smoke or use tobacco products?",
  "Do you consume alcohol?",
  "Any family history of major diseases?",
  "Do you exercise regularly?",
  "What is your typical diet like?",
  "Any mental health concerns you'd like to share?"
];

export default function ConsentPage() {
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [consent, setConsent] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id, // ✅ Attach userId
        history: answers
      })
    });
    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Consent & Medical History</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span className="ml-2">I consent to provide my medical history</span>
        </label>
        {questions.map((q, i) => (
          <div key={i} className="mb-4">
            <label className="block font-semibold mb-1">{q}</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded" 
              value={answers[i]} 
              onChange={(e) => handleChange(i, e.target.value)} 
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
