from fastapi import FastAPI, Query
from typing import List, Optional
from scraper import scrape_books_filtered

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Сервер працює. Перейдіть на /scrape"}

@app.get("/scrape")
def scrape_books(
    pages: int = Query(1, ge=1, le=10),
    genre: Optional[str] = Query(None, description="Жанр книги"),
    title: Optional[str] = Query(None, description="Пошук у назві книги"),
):
    """
    Парсинг книг зі сторінок books.toscrape.com з фільтрацією
    """
    books = scrape_books_filtered(genre=genre, title_contains=title, max_pages=pages)
    return {"count": len(books), "books": books}
