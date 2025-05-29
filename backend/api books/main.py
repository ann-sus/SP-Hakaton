from fastapi import FastAPI, Query
from typing import List
from scraper import scrape_all_books

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Сервер працює. Перейдіть на /scrape"}

@app.get("/scrape")
def scrape_books(pages: int = Query(1, ge=1, le=10)):
    """
    Парсинг книг зі сторінок books.toscrape.com
    :param pages: кількість сторінок для парсингу (1–10)
    """
    books = scrape_all_books(max_pages=pages)
    return {"count": len(books), "books": books}
