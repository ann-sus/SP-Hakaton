# users/permissions.py
from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Дозвіл лише для адміністраторів (is_staff=True).
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
