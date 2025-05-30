import React, { useState, useEffect } from "react";
import { refreshAccessToken } from "../utils/tokenRefresh";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const initialBooks = [];

function AdminPage() {
  const [books, setBooks] = useState(initialBooks);
  const [form, setForm] = useState({
    id: null,
    title: "",
    author: "",
    summary: "",
    genres: "",
    coverUrl: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseMsg, setParseMsg] = useState("");

  // --- API URL ---
  const API_URL = `${import.meta.env.VITE_API_SERVER}/api/books/`;

  // --- Fetch books on mount ---
  useEffect(() => {
    fetchWithAuth(API_URL)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => setError("Не вдалося завантажити книги"));
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      let access = localStorage.getItem("access");
      if (!access) {
        setError("Доступ заборонено");
        return;
      }
      let res = await fetchWithAuth(`${import.meta.env.VITE_API_SERVER}/api/auth/profile/`, {
        headers: { "Authorization": `Bearer ${access}` }
      });
      if (res && res.ok) {
        const data = await res.json();
        if (!data.is_staff) {
          setError("Доступ лише для адміністратора");
        }
      } else {
        setError("Доступ заборонено");
      }
    };
    checkAdmin();
  }, []);
  
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Add book ---
  const handleAdd = async e => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.author) return;
    try {
      const response = await fetchWithAuth(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          genres: form.genres.split(",").map(g => g.trim())
        })
      });
      if (response.ok) {
        const newBook = await response.json();
        setBooks([...books, newBook]);
        setForm({ id: null, title: "", author: "", summary: "", genres: "", coverUrl: "" });
      } else {
        setError("Не вдалося додати книгу");
      }
    } catch {
      setError("Помилка з'єднання з сервером");
    }
  };

  // --- Edit book ---
  const handleEdit = book => {
    setEditMode(true);
    setForm({ ...book, genres: book.genres.join(", ") });
  };

  // --- Update book ---
  const handleUpdate = async e => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetchWithAuth(`${API_URL}${form.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          genres: form.genres.split(",").map(g => g.trim())
        })
      });
      if (response.ok) {
        const updatedBook = await response.json();
        setBooks(books.map(b => b.id === form.id ? updatedBook : b));
        setEditMode(false);
        setForm({ id: null, title: "", author: "", summary: "", genres: "", coverUrl: "" });
      } else {
        setError("Не вдалося оновити книгу");
      }
    } catch {
      setError("Помилка з'єднання з сервером");
    }
  };

  // --- Delete book ---
  const handleDelete = async id => {
    setError("");
    try {
      const response = await fetchWithAuth(`${API_URL}${id}/`, { method: "DELETE" });
      if (response.ok) {
        setBooks(books.filter(b => b.id !== id));
        if (editMode && form.id === id) {
          setEditMode(false);
          setForm({ id: null, title: "", author: "", summary: "", genres: "", coverUrl: "" });
        }
      } else {
        setError("Не вдалося видалити книгу");
      }
    } catch {
      setError("Помилка з'єднання з сервером");
    }
  };

  const handleParseBooks = async () => {
    setParsing(true);
    setParseMsg("");
    setError("");
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_SERVER}/api/books/scrape/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        setParseMsg(data.message || "Книги спарсено!");
        // Оновити список книг після парсингу
        const booksRes = await fetchWithAuth(API_URL);
        if (booksRes.ok) {
          const booksData = await booksRes.json();
          setBooks(booksData);
        }
      } else {
        setParseMsg("Не вдалося спарсити книги");
      }
    } catch {
      setParseMsg("Помилка з'єднання з сервером");
    } finally {
      setParsing(false);
    }
  };

  if (error) {
    return <div style={{ maxWidth: 600, margin: '200px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px rgba(0,0,0,0.10)', padding: 36, textAlign: 'center', color: 'red', fontSize: 22 }}>{error}</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", marginTop: "200px", background: "#fff", borderRadius: 18, boxShadow: "0 4px 32px rgba(0,0,0,0.10)", padding: 36 }}>
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Адмін-панель: Книги</h1>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{error}</div>}
      <button
        onClick={handleParseBooks}
        disabled={parsing}
        style={{
          marginBottom: 24,
          padding: "10px 32px",
          background: parsing ? "#aaa" : "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
          cursor: parsing ? "not-allowed" : "pointer",
          transition: "background 0.2s"
        }}
      >
        {parsing ? "Парсинг..." : "Спарсити книги з books.toscrape.com"}
      </button>
      {parseMsg && <div style={{ color: '#1976d2', textAlign: 'center', marginBottom: 16 }}>{parseMsg}</div>}
      <form onSubmit={editMode ? handleUpdate : handleAdd} style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Назва" style={{ flex: 1, minWidth: 120, padding: 8 }} required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Автор" style={{ flex: 1, minWidth: 120, padding: 8 }} required />
        <input name="genres" value={form.genres} onChange={handleChange} placeholder="Жанри (через кому)" style={{ flex: 1, minWidth: 120, padding: 8 }} />
        <input name="coverUrl" value={form.coverUrl} onChange={handleChange} placeholder="Обкладинка (URL)" style={{ flex: 1, minWidth: 120, padding: 8 }} />
        <input name="summary" value={form.summary} onChange={handleChange} placeholder="Опис" style={{ flex: 2, minWidth: 180, padding: 8 }} />
        <button type="submit" style={{ padding: "8px 24px", background: editMode ? "#1976d2" : "#222", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600 }}>{editMode ? "Оновити" : "Додати"}</button>
        {editMode && <button type="button" onClick={() => { setEditMode(false); setForm({ id: null, title: "", author: "", summary: "", genres: "", coverUrl: "" }); }} style={{ padding: "8px 24px", background: "#aaa", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600 }}>Скасувати</button>}
      </form>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fafafa" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ padding: 8, border: "1px solid #e0e0e0" }}>Назва</th>
            <th style={{ padding: 8, border: "1px solid #e0e0e0" }}>Автор</th>
            <th style={{ padding: 8, border: "1px solid #e0e0e0" }}>Жанри</th>
            <th style={{ padding: 8, border: "1px solid #e0e0e0" }}>Опис</th>
            <th style={{ padding: 8, border: "1px solid #e0e0e0" }}>Обкладинка</th>
            <th style={{ padding: 8, border: "1px solid #e0e0e0" }}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td style={{ padding: 8, border: "1px solid #e0e0e0" }}>{book.title}</td>
              <td style={{ padding: 8, border: "1px solid #e0e0e0" }}>{book.author}</td>
              <td style={{ padding: 8, border: "1px solid #e0e0e0" }}>{Array.isArray(book.genres) ? book.genres.join(", ") : book.genres}</td>
              <td style={{ padding: 8, border: "1px solid #e0e0e0", maxWidth: 200, whiteSpace: "pre-line", overflow: "hidden", textOverflow: "ellipsis" }}>{book.summary}</td>
              <td style={{ padding: 8, border: "1px solid #e0e0e0" }}>
                {book.coverUrl && <img src={book.coverUrl} alt="cover" style={{ width: 40, height: 55, objectFit: "cover", borderRadius: 4 }} />}
              </td>
              <td style={{ padding: 8, border: "1px solid #e0e0e0" }}>
                <button onClick={() => handleEdit(book)} style={{ marginRight: 8, padding: "4px 12px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 6, fontWeight: 500 }}>Редагувати</button>
                <button onClick={() => handleDelete(book.id)} style={{ padding: "4px 12px", background: "#d32f2f", color: "#fff", border: "none", borderRadius: 6, fontWeight: 500 }}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
