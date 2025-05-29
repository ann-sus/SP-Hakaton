import requests
from bs4 import BeautifulSoup

BASE_URL = "https://books.toscrape.com/catalogue/page-{}.html"

def get_books_from_page(page_num):
    url = BASE_URL.format(page_num)
    response = requests.get(url)
    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    books = []

    for book in soup.select("article.product_pod"):
        title = book.h3.a['title']
        price = book.select_one("p.price_color").text.strip().replace('£', '')
        availability = book.select_one("p.instock.availability").text.strip()

        books.append({
            "title": title,
            "price": price,
            "availability": availability
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