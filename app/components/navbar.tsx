"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <motion.h1 whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-green-700 cursor-pointer">
              Doctor AI
            </motion.h1>
          </Link>

          {/* Links */}
          <ul className="flex space-x-6 text-gray-700 font-medium items-center">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/aboutus">About Us</NavItem>

            {status === "authenticated" ? (
              <>
                <NavItem href="/dashboard">Dashboard</NavItem>
                <NavItem href="/view-history">View History</NavItem>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavItem href="/login">Login</NavItem>
                <NavItem href="/register">Register</NavItem>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.li whileHover={{ scale: 1.1 }} className="cursor-pointer">
    <Link href={href} className="hover:text-green-600 transition">
      {children}
    </Link>
  </motion.li>
);
