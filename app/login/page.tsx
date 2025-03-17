"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || "Login failed. Please try again.");
        return;
      }

      const data = await res.json();
      console.log("Login successful:", data);
      router.push("/dashboard");

    } catch (err) {
      console.error("Error logging in:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
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
        <h2 className="text-3xl font-bold text-green-700 text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-6">Login to Doctor AI</p>

        {/* Error message */}
        {error && <p className="mb-4 text-center text-red-500 font-medium">{error}</p>}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-green-800 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg bg-green-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-green-800 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-lg bg-green-50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold text-white transition ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600 shadow-md"
            }`}
            whileHover={!loading ? { scale: 1.03 } : {}}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Link to Register */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">Register Now</Link>
        </p>
      </motion.div>
    </div>
  );
}
