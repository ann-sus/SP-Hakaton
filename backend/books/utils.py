import requests
from bs4 import BeautifulSoup

BASE_URL = "https://books.toscrape.com/catalogue/page-{}.html"
BOOK_URL_PREFIX = "https://books.toscrape.com/catalogue/"

def get_book_details(book_url):
    response = requests.get(book_url)
    if response.status_code != 200:
        return {}

    soup = BeautifulSoup(response.text, 'html.parser')
    description_tag = soup.select_one("#product_description ~ p")
    description = description_tag.text.strip() if description_tag else "No description"

    category_tag = soup.select("ul.breadcrumb li > a")
    genre = category_tag[-1].text.strip() if len(category_tag) >= 3 else "Unknown"

    return {
        "description": description,
        "genre": genre
    }

def get_books_from_page(page_num):
    url = BASE_URL.format(page_num)
    response = requests.get(url)
    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    books = []

    for book in soup.select("article.product_pod"):
        title = book.h3.a['title']
        price = book.select_one("p.price_color").text.strip().replace('\u00a3', '').replace('£', '')
        availability = book.select_one("p.instock.availability").text.strip()

        relative_url = book.h3.a['href']
        book_url = BOOK_URL_PREFIX + relative_url.replace('../../../', '')

        details = get_book_details(book_url)

        books.append({
            "title": title,
            "price": price,
            "availability": availability,
            "genre": details.get("genre", "Unknown"),
            "description": details.get("description", "No description"),
        })

    return books

def scrape_all_books(max_pages=1):
    all_books = []
    for page in range(1, max_pages + 1):
        books = get_books_from_page(page)
        if not books:
            break
        all_books.extend(books)
    return all_books
