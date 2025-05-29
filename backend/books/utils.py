import requests
from bs4 import BeautifulSoup
from .models import Book

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
        price = book.select_one("p.price_color").text.strip().replace('£', '')
        availability = book.select_one("p.instock.availability").text.strip()

        rating_class = book.p.get("class", [])
        rating = next((cls for cls in rating_class if cls != "star-rating"), "No rating")

        relative_url = book.h3.a['href']
        book_url = BOOK_URL_PREFIX + relative_url.replace('../../../', '')

        details = get_book_details(book_url)

        books.append({
            "title": title,
            "price": price,
            "availability": availability,
            "rating": rating,
            "genre": details.get("genre", "Unknown"),
            "description": details.get("description", "No description"),
        })

    return books

def save_books_to_db(books):
    for book_data in books:
        Book.objects.update_or_create(
            title=book_data['title'],
            defaults={
                'price': book_data['price'],
                'availability': book_data['availability'],
                'rating': book_data['rating'],
                'genre': book_data['genre'],
                'description': book_data['description'],
            }
        )

def scrape_all_books(max_pages=1, save_to_db=False):
    all_books = []
    for page in range(1, max_pages + 1):
        books = get_books_from_page(page)
        if not books:
            break
        all_books.extend(books)

    if save_to_db:
        save_books_to_db(all_books)

    return all_books
