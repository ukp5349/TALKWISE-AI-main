"use client";

import { useEffect, useState } from "react";
import { UserButton, useUser } from "@stackframe/stack";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const user = useUser(); // From Stack
  const { login } = useAuth(); // Convex login helper
  const [synced, setSynced] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && user.primaryEmail && !synced) {
      const userName =
        user.displayName || user.primaryEmail.split("@")[0] || "User";
      setSynced(true);
      login(user.primaryEmail, userName).catch(() => setSynced(false));
    }
  }, [user, login, synced]);

  return (
    <div className="relative min-h-screen min-w-full flex flex-col text-gray-900">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg shadow-lg border-b border-indigo-100 flex justify-between items-center px-8 py-4 z-50">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Talkwise Logo"
            width={48}
            height={32}
            className="drop-shadow-md"
          />
          <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">
            Talkwise AI
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-200 ease-in-out text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md"
          >
            Dashboard
          </button>
          <UserButton />
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow pt-28 px-6 pb-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto gap-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900 leading-tight drop-shadow-sm">
          Welcome to <span className="text-indigo-700">Talkwise AI</span>
        </h2>
        <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
          Your voice-based AI learning assistant. Click{" "}
          <span className="font-semibold text-indigo-700">Dashboard</span> to
          start exploring powerful AI-driven tools tailored for you.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:from-indigo-800 active:to-indigo-900 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Get Started
        </button>
      </main>

      {/* Logged in as - bottom left */}
      {user && user.primaryEmail && (
        <div className="fixed bottom-3 left-3 text-sm text-gray-800 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-lg shadow-md border border-gray-200 select-none">
          Logged in as:{" "}
          <span className="font-medium text-indigo-700">
            {user.primaryEmail}
          </span>
        </div>
      )}
    </div>
  );
}
