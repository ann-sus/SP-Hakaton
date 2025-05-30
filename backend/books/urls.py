from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ScrapeBooksView, BookViewSet, export_books_excel

router = DefaultRouter()
router.register(r'', BookViewSet, basename='book')  # <-- зміни тут

urlpatterns = [
    path('scrape/', ScrapeBooksView.as_view(), name='scrape-books'),
    path("api/books/export/excel/", export_books_excel, name="book-export-books-excel"),
]

urlpatterns += router.urls
