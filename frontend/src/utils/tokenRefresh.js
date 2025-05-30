// utils/tokenRefresh.js
// Функція для оновлення access токена через refresh токен

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh })
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access", data.access);
      return data.access;
    } else {
      localStorage.setItem("isAuth", "false");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return null;
    }
  } catch {
    return null;
  }
}
