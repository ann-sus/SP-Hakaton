import requests
from bs4 import BeautifulSoup
from .models import Book
import re

BASE_URL = "https://books.toscrape.com/catalogue/page-{}.html"
BOOK_URL_PREFIX = "https://books.toscrape.com/catalogue/"

def get_book_details(book_url):
    resp = requests.get(book_url)
    resp.encoding = 'utf-8'
    soup = BeautifulSoup(resp.text, 'html.parser')
    desc_tag = soup.select_one("#product_description ~ p")
    description = desc_tag.text.strip() if desc_tag else ""
    crumbs = soup.select("ul.breadcrumb li > a")
    genre = crumbs[-1].text.strip() if len(crumbs) >= 3 else ""
    return {"description": description, "genre": genre}

def get_books_from_page(page):
    resp = requests.get(BASE_URL.format(page))
    resp.encoding = 'utf-8'
    if resp.status_code != 200:
        return []
    soup = BeautifulSoup(resp.text, 'html.parser')
    out = []
    for b in soup.select("article.product_pod"):
        title = b.h3.a['title']
        raw_price = b.select_one("p.price_color").text
        price = float(re.sub(r'[^\d.]', '', raw_price))
        availability = b.select_one("p.instock.availability").text.strip()
        cls = b.p.get("class", [])
        rating = next((c for c in cls if c!="star-rating"), "")
        rel = b.h3.a['href']
        details = get_book_details(BOOK_URL_PREFIX + rel.replace('../../../',''))
        out.append({
            "title": title,
            "price": price,
            "availability": availability,
            "rating": rating,
            **details
        })
    return out

def scrape_all_books(max_pages=1):
    all_books = []
    for page in range(1, max_pages + 1):
        books = get_books_from_page(page)
        if not books:
            break
        all_books.extend(books)
    return all_books


def save_books_to_db(books_list):
    created = updated = 0
    for data in books_list:
        obj, flag = Book.objects.update_or_create(
            title=data["title"],
            defaults={
                "price": data["price"],
                "availability": data["availability"],
                "rating": data["rating"],
                "genre": data.get("genre", ""),
                "description": data.get("description", ""),
            }
        )
        if flag:
            created += 1
        else:
            updated += 1
    return created, updated
