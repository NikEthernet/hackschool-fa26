import type { PublicProfile, UserProfile } from "@/lib/types";

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

export const testOthers: PublicProfile[] = [
  { _id: "o1", username: "Ada", bio: "Three guesses or bust.", streak: 21 },
  { _id: "o2", username: "Linus", bio: "Starts every game with SLATE.", streak: 9 },
  { _id: "o3", username: "Grace", bio: "Streak or nothing.", streak: 15 },
  { _id: "o4", username: "Alan", bio: "Vowels first, ask questions later.", streak: 3 },
  { _id: "o5", username: "Margaret", bio: "", streak: 28 },
  { _id: "o6", username: "Dennis", bio: "Here for the daily puzzle.", streak: 12 },
  { _id: "o7", username: "Barbara", bio: "Three guesses or bust.", streak: 6 },
  { _id: "o8", username: "Ken", bio: "Starts every game with SLATE.", streak: 18 },
  { _id: "o9", username: "Radia", bio: "", streak: 1 },
  { _id: "o10", username: "Tim", bio: "Streak or nothing.", streak: 24 },
  { _id: "o11", username: "Hedy", bio: "Vowels first, ask questions later.", streak: 5 },
  { _id: "o12", username: "Guido", bio: "Here for the daily puzzle.", streak: 10 },
];