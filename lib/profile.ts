import profileData from "@/public/profile.json";
import type { Profile } from "@/types/profile";

export function getProfile(): Profile {
  return profileData as Profile;
}