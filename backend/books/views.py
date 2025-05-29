from rest_framework import viewsets, permissions
from .models import Book
from .serializers import BookSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from books.utils import scrape_all_books

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Адміністратор має повний доступ, інші — тільки читання
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]

class ScrapeBooksView(APIView):
    def get(self, request):
        pages = int(request.query_params.get('pages', 1))
        pages = max(1, min(pages, 10))  # обмеження 1–10
        books = scrape_all_books(pages)
        return Response({"count": len(books), "books": books}, status=status.HTTP_200_OK)