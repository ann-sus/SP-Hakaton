// utils/withTokenRefresh.js
import React, { useEffect } from "react";
import { refreshAccessToken } from "./tokenRefresh";

export function withTokenRefresh(WrappedComponent) {
  return function TokenRefreshWrapper(props) {
    useEffect(() => {
      const checkAndRefresh = async () => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");
        if (refresh && access) {
          // Перевірка access токена (наприклад, спроба decode або просто оновлення раз на певний час)
          // Тут оновлюємо токен при кожному монтуванні сторінки
          await refreshAccessToken();
        }
      };
      checkAndRefresh();
    }, []);
    return <WrappedComponent {...props} />;
  };
}
