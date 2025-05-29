from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .utils import scrape_all_books  #ІМПОРТ

class ScrapeBooksView(APIView):
    def get(self, request):
        page_count = int(request.query_params.get('pages', 1))
        if page_count < 1 or page_count > 10:
            return Response({"error": "Pages must be between 1 and 10"}, status=400)

        books = scrape_all_books(page_count)  #ВИКЛИК
        return Response({"count": len(books), "books": books})