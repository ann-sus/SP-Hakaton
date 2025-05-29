from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import ProfileView, PasswordResetView, PasswordResetConfirmView, RegisterView
from .views import ChangePasswordView



urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),

    path('register/', RegisterView.as_view(), name='register'),

    #password renew with email
    path('password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
]
