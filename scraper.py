import requests
from bs4 import BeautifulSoup

BASE_URL = "https://books.toscrape.com/"
CATALOGUE_URL = BASE_URL + "catalogue/"

def get_soup(url):
    response = requests.get(url)
    response.raise_for_status()
    return BeautifulSoup(response.text, 'html.parser')

def get_genres():
    soup = get_soup(BASE_URL)
    genres = {}
    for li in soup.select("ul.nav-list > li > ul > li > a"):
        genre_name = li.text.strip()
        genre_link = BASE_URL + li['href']
        genres[genre_name] = genre_link
    return genres

def get_books_from_genre(genre_url, max_pages=1):
    books = []
    for page in range(1, max_pages + 1):
        url = genre_url.replace("index.html", f"page-{page}.html")
        try:
            soup = get_soup(url)
        except requests.HTTPError:
            break

        for book in soup.select("article.product_pod"):
            title = book.h3.a['title']
            price = book.select_one("p.price_color").text.strip()
            availability = book.select_one("p.instock.availability").text.strip()

            books.append({
                "title": title,
                "price": price,
                "availability": availability,
                "genre": genre_url.split("/")[-2].replace("_", " ")  # Назва жанру в URL
            })
        # Перевірка, чи є наступна сторінка:
        next_button = soup.select_one("li.next > a")
        if not next_button:
            break
    return books

def scrape_books_filtered(genre=None, title_contains=None, max_pages=1):
    all_books = []
    if genre:
        genres = get_genres()
        genre_lower = genre.lower()
        matched_genre = None
        for g in genres:
            if g.lower() == genre_lower:
                matched_genre = genres[g]
                break
        if not matched_genre:
            return []  # Жанр не знайдено
        books = get_books_from_genre(matched_genre, max_pages)
    else:
        # Якщо жанр не вказано — парсимо всі книги з головної (перші сторінки каталогу)
        books = []
        for page in range(1, max_pages + 1):
            url = CATALOGUE_URL + f"page-{page}.html"
            try:
                soup = get_soup(url)
            except requests.HTTPError:
                break

            for book in soup.select("article.product_pod"):
                title = book.h3.a['title']
                price = book.select_one("p.price_color").text.strip()
                availability = book.select_one("p.instock.availability").text.strip()

                books.append({
                    "title": title,
                    "price": price,
                    "availability": availability,
                    "genre": None
                })
            next_button = soup.select_one("li.next > a")
            if not next_button:
                break

    # Фільтр по назві
    if title_contains:
        title_lower = title_contains.lower()
        books = [b for b in books if title_lower in b["title"].lower()]

    return books
