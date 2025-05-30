import React from "react";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles["notfound-outer"]}>
      <div className={styles["notfound-box"]}>
        <div className={styles["notfound-title"]}>404</div>
        <div className={styles["notfound-desc"]}>
          Сторінку не знайдено
          <br />
          <span style={{ fontSize: 18, color: "#bbb" }}>
            Вибачте, але такої сторінки не існує.
            <br />Можливо, ви помилилися в адресі або сторінку було видалено.
          </span>
        </div>
        <a href="/" className={styles["notfound-link"]}>
          На головну
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
