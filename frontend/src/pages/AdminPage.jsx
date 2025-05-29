import React, { useState } from "react";

const initialBooks = [
  {
    id: 1,
    title: "Book Title 1",
    author: "Author 1",
    summary: "Short summary 1...",
    genres: ["Fiction", "Adventure"],
    coverUrl: "https://via.placeholder.com/160x220?text=Book+1"
  },
  {
    id: 2,
    title: "Book Title 2",
    author: "Author 2",
    summary: "Short summary 2...",
    genres: ["Non-fiction"],
    coverUrl: "https://via.placeholder.com/160x220?text=Book+2"
  }
];

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!form.title || !form.author) return;
    setBooks([
      ...books,
      {
        ...form,
        id: Date.now(),
        genres: form.genres.split(",").map(g => g.trim())
      }
    ]);
    setForm({ id: null, title: "", author: "", summary: "", genres: "", coverUrl: "" });
  };

  const handleEdit = book => {
    setEditMode(true);
    setForm({ ...book, genres: book.genres.join(", ") });
  };

  const handleUpdate = e => {
    e.preventDefault();
    setBooks(books.map(b => b.id === form.id ? { ...form, genres: form.genres.split(",").map(g => g.trim()) } : b));
    setEditMode(false);
    setForm({ id: null, title: "", author: "", summary: "", genres: "", coverUrl: "" });
  };

  const handleDelete = id => {
    setBooks(books.filter(b => b.id !== id));
    if (editMode && form.id === id) {
      setEditMode(false);
      setForm({ id: null, title: "", author: "", summary: "", genres: "", coverUrl: "" });
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", marginTop: "200px", background: "#fff", borderRadius: 18, boxShadow: "0 4px 32px rgba(0,0,0,0.10)", padding: 36 }}>
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Адмін-панель: Книги</h1>
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
              <td style={{ padding: 8, border: "1px solid #e0e0e0" }}>{book.genres.join(", ")}</td>
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
