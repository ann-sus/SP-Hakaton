import React from 'react';
import './style.css';
import { BookCover, BookInfo, BookGenres } from '../components/BookDescriptionParts';

const BookDescription = ({ book }) => {
  return (
    <div className="book-description-container">
      <div className="book-description-header">
        <BookCover coverUrl={book.coverUrl} />
        <BookInfo title={book.title} author={book.author} />
      </div>
      <div className="book-description-body">
        <p className="book-description-summary">{book.summary}</p>
        <BookGenres genres={book.genres} />
      </div>
    </div>
  );
};

export default BookDescription;
