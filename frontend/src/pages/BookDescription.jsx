import React from 'react';
import './style.css';

const BookDescription = ({ book }) => {
  return (
    <div className="book-description-container">
      <div className="book-description-header">
        <div
          className="book-description-cover"
          style={{ backgroundImage: `url(${book.coverUrl})` }}
        ></div>
        <div className="book-description-info">
          <h1 className="book-description-title">{book.title}</h1>
          <h2 className="book-description-author">by {book.author}</h2>
        </div>
      </div>
      <div className="book-description-body">
        <p className="book-description-summary">{book.summary}</p>
        <div className="book-description-genres">
          <h3 className="book-description-genres-title">Genres:</h3>
          <div className="book-description-genres-list">
            {book.genres.map((genre, index) => (
              <span key={index} className="book-description-genre-chip">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDescription;
