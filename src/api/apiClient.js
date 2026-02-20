const API_BASE_URL = "http://localhost:8000";

export async function apiClient(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(API_BASE_URL + url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    alert("期限になっています。再ログインお願いします。");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}
