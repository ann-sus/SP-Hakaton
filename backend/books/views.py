from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import scrape_all_books  #ІМПОРТ
# books/views.py
from rest_framework.viewsets import ModelViewSet
from .models import Book
from .serializers import BookSerializer
from .permissions import IsAdminOrReadOnly
import requests
from bs4 import BeautifulSoup




class ScrapeBooksView(APIView):
    def get(self, request):
        page_count = int(request.query_params.get('pages', 1))
        if page_count < 1 or page_count > 10:
            return Response({"error": "Pages must be between 1 and 10"}, status=400)

        scraped_books = scrape_all_books(page_count)
        created_count = 0

        for data in scraped_books:
            # Уникаємо дублювання за назвою (можна замінити на іншу перевірку)
            if not Book.objects.filter(title=data["title"]).exists():
                Book.objects.create(
                    title=data["title"],
                    author="Unknown",  # бо з сайту не скрапиться автор
                    genre=data["genre"],
                    year=0,  # якщо немає року — ставимо 0 або None
                    description=data["description"]
                )
                created_count += 1

        return Response({
            "message": f"{created_count} books added to the database.",
            "total_scraped": len(scraped_books)
        }, status=status.HTTP_201_CREATED)

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
