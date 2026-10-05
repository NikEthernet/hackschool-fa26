"use client";

import { useEffect, useState } from "react";
import type { PublicProfile } from "@/lib/types";

// Fetch all user endpoints from the API
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function OtherProfiles({ excludeUsername }: { excludeUsername?: string }) {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]); // every profile we fetched
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0); // bump this number to retry the fetch

  // Fetch all profiles once when the component loads
  useEffect(() => {
    let cancelled = false; // stops us from updating state if the component unmounts mid-fetch

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/api/users`);

        // getUsers controller returns 404 when there are no users
        if (res.status === 404) {
          if (!cancelled) setProfiles([]);
          return;
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data: PublicProfile[] = await res.json();

        // Remove the current user from the list
        if (!cancelled) {
          setProfiles(data.filter((u) => u.username !== excludeUsername));
        }

        // Uncomment this block to test your getRecentUsers() function!
        // (Comment out the getUsers fetch above first, so only one fetch runs.)
        // const recentRes = await fetch(`${API}/api/users/recent`);
        // if (recentRes.status === 404) {
        //   if (!cancelled) setProfiles([]);
        //   return;
        // }
        // if (!recentRes.ok) throw new Error(`Request failed (${recentRes.status})`);

        // const recentData: PublicProfile[] = await recentRes.json();

        // if (!cancelled) {
        //   setProfiles(recentData.filter((u) => u.username !== excludeUsername));
        // }

      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [excludeUsername, attempt]);

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg bg-slate-800 p-6">
      <h2 className="mb-4 shrink-0 text-2xl font-bold">Other Players</h2>

      {loading && <p className="text-sm opacity-60">Loading...</p>}

      {/*failed to reload, so gives another chance to retry*/}
      {error && (
        <button onClick={() => setAttempt((a) => a + 1)} className="text-sm underline">
          Failed to load. Retry
        </button>
      )}

      {!loading && !error && profiles.length === 0 && (
        <p className="text-sm opacity-60">No other players yet.</p>
      )}

      {profiles.length > 0 && (
        <ul className="scroll-dark flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain pr-2 max-h-80 lg:max-h-none">
          {profiles.map((p) => (
            <li key={p._id} className="flex shrink-0 items-center gap-3 rounded bg-slate-700 p-3">
              <img src="/Profile.png" width={36} alt="Profile" className="rounded-full" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.username}</p>
                {p.bio && <p className="truncate text-xs opacity-60">{p.bio}</p>}
              </div>
              <span className="text-sm opacity-80">🔥 {p.streak}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}