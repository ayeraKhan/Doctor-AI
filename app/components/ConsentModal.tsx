"use client";

import { motion } from "framer-motion";

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function ConsentModal({ isOpen, onAccept, onDecline }: ConsentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold text-gray-800">⚠️ Consent Form</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Doctor AI is an AI assistant and does not replace a licensed healthcare professional.
          It cannot diagnose, treat, or prescribe any medication. Always seek advice from your doctor.
          <br />
          <br />
          By clicking "I Agree", you accept these terms and release Doctor AI from any liability.
        </p>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onDecline}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
          >
            I Agree
          </button>
        </div>
      </motion.div>
    </div>
  );
}
