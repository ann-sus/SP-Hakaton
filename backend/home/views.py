from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class HomePageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "message": "Це основна сторінка API. Вітаємо!",
            "routes": {
                "Реєстрація": "/api/auth/register/",
                "Логін": "/api/auth/login/",
                "Профіль": "/api/auth/profile/",
                "API з книжками": "/api/books/"
            }
        })
