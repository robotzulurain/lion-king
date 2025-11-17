const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function fetchJson(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const resp = await fetch(
    url,
    Object.assign(
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      options
    )
  );

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Request failed ${resp.status} for ${url}: ${text}`);
  }

  // Some endpoints (e.g. 204) may have no body
  try {
    return await resp.json();
  } catch {
    return null;
  }
}

// -------- Public summary endpoints --------
export function getCountsSummary() {
  return fetchJson("/summary/counts-summary");
}

export function getTimeTrends(period = "month") {
  return fetchJson(`/summary/time-trends?period=${encodeURIComponent(period)}`);
}

export function getSexAge() {
  return fetchJson("/summary/sex-age");
}

export function getFacilities() {
  return fetchJson("/geo/facilities");
}

export function getOptions() {
  return fetchJson("/options");
}

export function getAlerts() {
  return fetchJson("/alerts");
}

export function getReportsSummary() {
  return fetchJson("/reports/summary");
}

export function getFacilityLeague() {
  return fetchJson("/reports/facility-league");
}

export function getReportsAntibiogram() {
  return fetchJson("/reports/antibiogram");
}

// -------- Auth (login) --------
export async function login(username, password) {
  return fetchJson("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// Default export (for components calling api.xxx)
const api = {
  getCountsSummary,
  getTimeTrends,
  getSexAge,
  getFacilities,
  getOptions,
  getAlerts,
  getReportsSummary,
  getFacilityLeague,
  getReportsAntibiogram,
  login,
};

export default api;
