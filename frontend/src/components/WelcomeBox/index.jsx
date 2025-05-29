import React from "react";
import "./style.css";

function WelcomeBox() {
  return (
    <div className="welcome-box">
      <h1 className="welcome-title">Ласкаво просимо до BOOKshelf!</h1>
      <p className="welcome-desc">
        Тут ви можете знайти інформацію про книгу, яка вас цікавить.<br />
        Щоб почати, увійдіть або зареєструйтесь.
      </p>
      <div className="welcome-actions">
        <a href="/login" className="welcome-link">Увійти</a>
        <a href="/signup" className="welcome-link signup">Зареєструватись</a>
      </div>
    </div>
  );
}

export default WelcomeBox;
