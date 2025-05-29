from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScrapeBooksView, BookViewSet


router = DefaultRouter()
router.register(r'', BookViewSet, basename='book')  # <-- пустий префікс

urlpatterns = [
    path('scrape/', ScrapeBooksView.as_view(), name='scrape-books'),
    path('', include(router.urls)),
]
