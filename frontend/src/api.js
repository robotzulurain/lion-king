import { API_BASE_URL } from "./config"; // adjust ../config if needed

export async function getCountsSummary() {
  const res = await fetch(`${API_BASE_URL}/api/summary/counts-summary`);
  if (!res.ok) {
    throw new Error("Failed to fetch counts summary");
  }
  return res.json();
}

// Add your other calls in this style:
export async function getSexAgeSummary() {
  const res = await fetch(`${API_BASE_URL}/api/summary/sex-age`);
  if (!res.ok) {
    throw new Error("Failed to fetch sex/age summary");
  }
  return res.json();
}
