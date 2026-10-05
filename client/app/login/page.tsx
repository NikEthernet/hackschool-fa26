"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setSession } from "@/lib/session";
import { testUser, TEST_PASSWORD } from "@/lib/testUser";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // stop the browser from reloading the page
    setError(null);
    setSubmitting(true);

    try {
      if (mode === "login" && username === testUser.username && password === TEST_PASSWORD) {
        setSession(testUser.username);
        router.push("/");
        return;
      }
      // Login and sign up hit different routes and send different fields
      const url = mode === "login" ? `${API}/api/users/login` : `${API}/api/users`;
      const body =
        mode === "login" ? { username, password } : { email, username, password, bio };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setSession(data.username); // remember who is signed in
      router.push("/"); // go to the game page
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded bg-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="flex flex-1 items-center justify-center bg-slate-900 px-6 text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-slate-800 p-6 flex flex-col gap-4">

        <h1 className="text-2xl font-bold">
          {mode === "login" ? "Sign in" : "Create account"}
        </h1>

        {mode === "login" && (
          <h2 className="text-l font-semibold text-left opacity-70">
            Go ahead and use "TheWordler" for the username and
            "mock-password-123" for the password
            for a test account
          </h2>
        )}

        {mode === "signup" && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={inputClass}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputClass}
        />

        {mode === "signup" && (
          <textarea
            placeholder="Bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className={inputClass}
          />
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-emerald-600 px-4 py-2 font-semibold hover:bg-emerald-500 disabled:opacity-50"
        >
          {submitting ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
        </button>

        <button
          type="button"
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
          className="text-sm underline opacity-70 hover:opacity-100"
        >
          {mode === "login" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}