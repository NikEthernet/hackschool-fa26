import type { UserProfile } from "@/lib/types";

// Local-only account for testing. It never touches the database.
export const TEST_PASSWORD = "mock-password-123";

export const testUser: UserProfile = {
  _id: "local-test-user",
  username: "TheWordler",
  email: "thewordler@example.com",
  bio: "Here to test the Wordle clone.",
  streak: 7,
  created_at: "2026-09-01T00:00:00.000Z",
  past_games: [
    { _id: "t1", word: "CRANE", guessed_words: ["SLATE", "CRANE"], date: "2026-10-04T00:00:00.000Z" },
    { _id: "t2", word: "PLUMB", guessed_words: ["SLATE", "CRONY", "PLUMB"], date: "2026-10-03T00:00:00.000Z" },
    { _id: "t3", word: "GHOST", guessed_words: ["SLATE", "ROAST", "MOIST", "GHOST"], date: "2026-10-02T00:00:00.000Z" },
    { _id: "t4", word: "WALTZ", guessed_words: ["SLATE", "CRONY", "MAGIC", "PIXEL", "FJORD", "VAULT"], date: "2026-10-01T00:00:00.000Z" },
    { _id: "t5", word: "STONE", guessed_words: ["SLATE", "CRONY", "STONE"], date: "2026-09-30T00:00:00.000Z" },
  ],
};