from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.viewsets import ModelViewSet
from .models import Book
from .serializers import BookSerializer
from .permissions import IsAdminOrReadOnly

from .utils import scrape_all_books


class ScrapeBooksView(APIView):
    def get(self, request):
        page_count = int(request.query_params.get('pages', 1))
        save = request.query_params.get('save', 'false').lower() == 'true'

        if page_count < 1 or page_count > 10:
            return Response({"error": "Pages must be between 1 and 10"}, status=400)

        books = scrape_all_books(page_count, save_to_db=save)
        return Response({"count": len(books), "books": books})

class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]
