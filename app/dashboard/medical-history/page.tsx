"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MedicalHistoryForm() {
  const [medicalHistory, setMedicalHistory] = useState({
    age: "",
    weight: "",
    height: "",
    allergies: "",
    medications: "",
    medicalConditions: "",
    surgeries: "",
    smoking: "",
    alcoholConsumption: "",
    familyHistory: "",
    exercise: "",
    diet: "",
  });

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setMedicalHistory({ ...medicalHistory, [e.target.name]: e.target.value });
  };

  // ✅ Validate & Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all fields are filled before saving
    for (const key in medicalHistory) {
      if (medicalHistory[key as keyof typeof medicalHistory].trim() === "") {
        setError("Please fill in all required fields.");
        return;
      }
    }

    setError(null);
    localStorage.setItem("medicalHistory", JSON.stringify(medicalHistory));
    alert("Medical history saved!");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Fill Your Medical History</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Age Input (Fixed) */}
        <input
          type="number"
          name="age"
          value={medicalHistory.age}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Enter your age"
          min="1"
          required
        />

        {/* Weight Input */}
        <input
          type="number"
          name="weight"
          value={medicalHistory.weight}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Enter your weight (kg)"
          required
        />

        {/* Height Input */}
        <input
          type="number"
          name="height"
          value={medicalHistory.height}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Enter your height (cm)"
          required
        />

        {/* Allergies */}
        <textarea
          name="allergies"
          value={medicalHistory.allergies}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="List any allergies"
          required
        />

        {/* Medications */}
        <textarea
          name="medications"
          value={medicalHistory.medications}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="List any medications you're taking"
          required
        />

        {/* Medical Conditions */}
        <textarea
          name="medicalConditions"
          value={medicalHistory.medicalConditions}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="List any medical conditions"
          required
        />

        {/* Surgeries */}
        <textarea
          name="surgeries"
          value={medicalHistory.surgeries}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="List any past surgeries"
          required
        />

        {/* Smoking */}
        <select name="smoking" value={medicalHistory.smoking} onChange={handleChange} className="border p-2 w-full rounded" required>
          <option value="">Do you smoke?</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        {/* Family History */}
        <textarea
          name="familyHistory"
          value={medicalHistory.familyHistory}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Any major diseases in your family history?"
          required
        />

        {/* Exercise */}
        <select name="exercise" value={medicalHistory.exercise} onChange={handleChange} className="border p-2 w-full rounded" required>
          <option value="">Do you exercise regularly?</option>
          <option value="No">No</option>
          <option value="1-2 times a week">1-2 times a week</option>
          <option value="3-5 times a week">3-5 times a week</option>
          <option value="Daily">Daily</option>
        </select>

        {/* Diet */}
        <textarea
          name="diet"
          value={medicalHistory.diet}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Describe your typical diet"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Save History
        </button>
      </form>
    </div>
  );
}
