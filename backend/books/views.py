from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import scrape_all_books  #ІМПОРТ
import requests
from bs4 import BeautifulSoup
from rest_framework.permissions import IsAdminUser
# books/views.py
from rest_framework.viewsets import ModelViewSet
from .models import Book
from .serializers import BookSerializer
from .permissions import IsAdminOrReadOnly

class ScrapeBooksView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        page_count = int(request.query_params.get('pages', 1))
        if page_count < 1 or page_count > 10:
            return Response({"error": "Pages must be between 1 and 10"}, status=400)

        books = scrape_all_books(page_count)

        # Отримати фільтри з query params
        genre = request.query_params.get('genre')
        title = request.query_params.get('title')
        rating = request.query_params.get('rating')
        availability = request.query_params.get('availability')

        # Фільтрація результатів
        if genre:
            books = [b for b in books if genre.lower() in b['genre'].lower()]
        if title:
            books = [b for b in books if title.lower() in b['title'].lower()]
        if rating:
            books = [b for b in books if rating.lower() == b['rating'].lower()]
        if availability:
            books = [b for b in books if availability.lower() in b['availability'].lower()]

        return Response({"count": len(books), "books": books})


    def scrape_books(self, max_pages):
        BASE_URL = "https://books.toscrape.com/catalogue/page-{}.html"
        all_books = []

        for page in range(1, max_pages + 1):
            url = BASE_URL.format(page)
            response = requests.get(url)
            if response.status_code != 200:
                continue

            soup = BeautifulSoup(response.text, 'html.parser')
            for book in soup.select("article.product_pod"):
                title = book.h3.a['title']
                price = book.select_one("p.price_color").text.strip()
                availability = book.select_one("p.instock.availability").text.strip()

                all_books.append({
                    "title": title,
                    "price": price,
                    "availability": availability
                })

        return all_books



class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]
