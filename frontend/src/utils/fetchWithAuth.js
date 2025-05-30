// utils/fetchWithAuth.js
// Функція-обгортка для fetch з автоматичним оновленням access токена при 401
import { refreshAccessToken } from "./tokenRefresh";

export async function fetchWithAuth(url, options = {}) {
  let access = localStorage.getItem("access");
  if (!options.headers) options.headers = {};
  if (access) options.headers["Authorization"] = `Bearer ${access}`;

  let response = await fetch(url, options);
  if (response.status === 401) {
    // Спробувати оновити токен
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      options.headers["Authorization"] = `Bearer ${newAccess}`;
      response = await fetch(url, options);
    }
  }
  return response;
}
