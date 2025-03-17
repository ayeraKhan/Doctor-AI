"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ConsentModal from "@/app/components/ConsentModal";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showConsentModal, setShowConsentModal] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConsentModal(true); // Trigger consent modal
  };

  // Final submit after consent
  const handleFinalSubmit = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, consentGiven: true }),
    });

    if (res.ok) {
      alert("Registration successful!");
      router.push("/dashboard");
    } else {
      const error = await res.json();
      alert(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-green-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-green-700 text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-600 mb-6">Join Doctor AI today!</p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-green-800 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter your username"
              required
              className="w-full p-3 rounded-lg bg-green-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg bg-green-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-800 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a password"
              required
              className="w-full p-3 rounded-lg bg-green-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 shadow-md transition duration-300"
            whileHover={{ scale: 1.03 }}
          >
            Register
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onAccept={() => {
          setShowConsentModal(false);
          handleFinalSubmit();
        }}
        onDecline={() => setShowConsentModal(false)}
      />
    </div>
  );
}
