import React, { useEffect, useState } from 'react';
import './style.css';
import { BookCover, BookInfo, BookGenres } from '../components/BookDescriptionParts';
import { useParams } from 'react-router-dom';

const BookDescription = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/books/${id}/`);
        if (!response.ok) {
          throw new Error("Не вдалося отримати дані книги");
        }
        const data = await response.json();
        // Якщо бекенд повертає масив, беремо перший елемент
        setBook(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(err.message || "Сталася помилка");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!book) return <div>Книга не знайдена</div>;

  return (
    <div className="book-description-container">
      <div className="book-description-header">
        <BookCover coverUrl={book.coverUrl || '/assets/book1.jpg'} />
        <BookInfo title={book.title} author={book.author || book.genre} />
      </div>
      <div className="book-description-body">
        <p className="book-description-summary">{book.description}</p>
        <BookGenres genres={book.genre ? [book.genre] : []} />
      </div>
    </div>
  );
};

export default BookDescription;
