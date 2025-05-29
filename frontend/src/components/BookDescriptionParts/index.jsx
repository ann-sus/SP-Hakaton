import React from "react";
import "./style.css";

const BookCover = ({ coverUrl }) => (
  <div
    className="book-description-cover"
    style={{ backgroundImage: `url(${coverUrl})` }}
  ></div>
);

const BookInfo = ({ title, author }) => (
  <div className="book-description-info">
    <h1 className="book-description-title">{title}</h1>
    <h2 className="book-description-author">by {author}</h2>
  </div>
);

const BookGenres = ({ genres }) => (
  <div className="book-description-genres">
    <h3 className="book-description-genres-title">Genres:</h3>
    <div className="book-description-genres-list">
      {genres.map((genre, index) => (
        <span key={index} className="book-description-genre-chip">
          {genre}
        </span>
      ))}
    </div>
  </div>
);

export { BookCover, BookInfo, BookGenres };
