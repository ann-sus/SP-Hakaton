import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";


import { useEffect, useState } from "react";

const genres = [
  "Fiction", "Fantasy", "Romance", "Mystery", "History"
];


function MyBooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_SERVER}/api/books/`);
        if (!response.ok) {
          throw new Error("Не вдалося отримати список книг");
        }
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Сталася помилка");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="my-books-container">
      <h2 className="my-books-title">Мої книги</h2>
      {loading && <div>Завантаження...</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
      <div className="my-books-row-wrapper">
        <div className="my-books-row">
          {books.map(book => (
            <div
              className="my-book-card"
              key={book.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <div className="my-book-cover" style={{ backgroundImage: `url(/assets/book1.jpg)` }} />
              <div className="my-book-info">
                <div className="my-book-title">{book.title}</div>
                <div className="my-book-author">{book.author || book.genre}</div>
                <div className="my-book-year">{book.publication_year}</div>
                <div className="my-book-price">{book.price} грн</div>
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
