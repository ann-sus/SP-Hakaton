from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ScrapeBooksView, BookViewSet

router = DefaultRouter()
router.register(r'', BookViewSet, basename='book')  # <-- зміни тут

urlpatterns = [
]

urlpatterns += router.urls
