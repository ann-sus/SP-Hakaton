# books/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import scrape_all_books  #ІМПОРТ
from rest_framework.viewsets import ModelViewSet
from .models import Book
from .serializers import BookSerializer
from .permissions import IsAdminOrReadOnly
import openpyxl
from django.http import HttpResponse
from django.db.models import Q
from rest_framework.decorators import action
from django.contrib.auth.decorators import login_required

class ScrapeBooksView(APIView):
    def get(self, request):
        page_count = int(request.query_params.get('pages', 1))
        if page_count < 1 or page_count > 10:
            return Response({"error": "Pages must be between 1 and 10"}, status=400)

        books = scrape_all_books(page_count)  #ВИКЛИК
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

    @action(detail=False, methods=['get'], url_path='export/excel')
    @login_required
    def export_books_excel(self, request):
        genre = request.GET.get('genre')
        title = request.GET.get('title')
        price = request.GET.get('price')
        availability = request.GET.get('availability')
        year_from = request.GET.get('year_from')
        year_to = request.GET.get('year_to')

        books = self.queryset

        if genre:
            books = books.filter(genre__icontains=genre)
        if title:
            books = books.filter(title__icontains=title)
        if price:
            books = books.filter(price__icontains=price)
        if availability:
            books = books.filter(availability_icontains=availability)
        if year_from:
            books = books.filter(publication_year__gte=year_from)
        if year_to: 
            books = books.filter(publication_year__lte=year_to)


        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Books"
        ws.append(["Title", "Genre", "Price", "Publication Year", "Availability"])

        for book in books:
            ws.append([
                book.title,
                book.genre,
                book.price,
                book.publication_year,
                book.description,
            ])

        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        response['Content-Disposition'] = 'attachment; filename=books.xlsx'
        wb.save(response)
        return response