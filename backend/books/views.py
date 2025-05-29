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
from rest_framework.permissions import IsAdminUser
from .utils import scrape_all_books, save_books_to_db

class ScrapeBooksView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        books_data = scrape_all_books()
        save_books_to_db(books_data)
        return Response({"message": "Books scraped and saved successfully."})
    
class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]
