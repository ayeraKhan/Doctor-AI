/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // ✅ For Next.js app directory
    "./pages/**/*.{js,ts,jsx,tsx}",     // ✅ (Optional) If you use /pages
    "./components/**/*.{js,ts,jsx,tsx}" // ✅ (Optional) If you use components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
