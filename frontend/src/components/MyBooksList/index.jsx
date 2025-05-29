import React from "react";
import "./style.css";

// Мокові дані для прикладу
const books = [
  {
    id: 1,
    title: "A Light in the Attic",
    author: "Shel Silverstein",
    cover: "/assets/book1.jpg"
  },
  {
    id: 2,
    title: "Scott Pilgrim Vol. 1",
    author: "Bryan Lee O'Malley",
    cover: "/assets/book2.jpg"
  },
  {
    id: 3,
    title: "The Coming Woman",
    author: "Karen J. Hicks",
    cover: "/assets/book3.jpg"
  },
  {
    id: 4,
    title: "It's Only the Himalayas",
    author: "S. Bedford",
    cover: "/assets/book4.jpg"
  },
  {
    id: 5,
    title: "Soumission",
    author: "Michel Houellebecq",
    cover: "/assets/book5.jpg"
  }
];

const genres = [
  "Fiction", "Fantasy", "Romance", "Mystery", "History"
];

function MyBooksList() {
  return (
    <div className="my-books-container">
      <h2 className="my-books-title">Мої книги</h2>
      <div className="my-books-row-wrapper">
        <div className="my-books-row">
          {books.map(book => (
            <div className="my-book-card" key={book.id}>
              <div className="my-book-cover" style={{ backgroundImage: `url(${book.cover})` }} />
              <div className="my-book-info">
                <div className="my-book-title">{book.title}</div>
                <div className="my-book-author">{book.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-genres-section">
        <h3 className="my-genres-title">Жанри</h3>
        <div className="my-genres-list">
          {genres.map((genre, idx) => (
            <div className="my-genre-chip" key={idx}>{genre}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBooksList;
