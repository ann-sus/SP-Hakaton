from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet
from .views import ScrapeBooksView

router = DefaultRouter()
router.register(r'', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('scrape/', ScrapeBooksView.as_view(), name='scrape-books'),
]
