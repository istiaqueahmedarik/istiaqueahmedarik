import { unstable_cache } from "next/cache";
import { CodeforcesStats } from "@/types";

const HANDLE = "Istiaque_ahmed";
const PROFILE_URL = `https://codeforces.com/profile/${HANDLE}`;
const REVALIDATE_SECONDS = 21600;

interface CfUserInfo {
  handle: string;
  rank?: string;
  maxRank?: string;
  rating?: number;
  maxRating?: number;
  organization?: string;
  contribution?: number;
  friendOfCount?: number;
}

interface CfSubmission {
  verdict?: string;
  problem: { contestId?: number; index: string; rating?: number };
}

interface CfRatingEntry {
  contestId: number;
}

async function cfFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error("Codeforces API error:", res.status);
      return null;
    }
    const json = await res.json();
    if (json.status !== "OK") {
      console.error("Codeforces API status:", json.comment);
      return null;
    }
    return json.result as T;
  } catch (error) {
    console.error("Failed to fetch Codeforces data:", error);
    return null;
  }
}

async function fetchCodeforcesStats(): Promise<CodeforcesStats | null> {
  const [info, submissions, ratingChanges] = await Promise.all([
    cfFetch<CfUserInfo[]>(`https://codeforces.com/api/user.info?handles=${HANDLE}`),
    cfFetch<CfSubmission[]>(`https://codeforces.com/api/user.status?handle=${HANDLE}`),
    cfFetch<CfRatingEntry[]>(`https://codeforces.com/api/user.rating?handle=${HANDLE}`),
  ]);

  const user = info?.[0];
  if (!user) return null;

  const solvedKeys = new Set<string>();
  const solvedRatings: number[] = [];
  for (const submission of submissions ?? []) {
    if (submission.verdict !== "OK") continue;
    const { contestId, index, rating } = submission.problem;
    const key = `${contestId ?? "x"}-${index}`;
    if (solvedKeys.has(key)) continue;
    solvedKeys.add(key);
    if (typeof rating === "number") solvedRatings.push(rating);
  }

  const hardestSolved = solvedRatings.length ? Math.max(...solvedRatings) : null;

  return {
    handle: user.handle,
    profileUrl: PROFILE_URL,
    rank: user.rank ?? null,
    maxRank: user.maxRank ?? null,
    rating: user.rating ?? null,
    maxRating: user.maxRating ?? null,
    organization: user.organization ?? null,
    solvedCount: solvedKeys.size,
    contestCount: ratingChanges?.length ?? 0,
    hardestSolved,
  };
}

export const getCodeforcesStats = unstable_cache(
  fetchCodeforcesStats,
  ["codeforces-stats", HANDLE],
  { revalidate: REVALIDATE_SECONDS }
);
