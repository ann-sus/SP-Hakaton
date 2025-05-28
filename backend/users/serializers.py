# users/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']


User = get_user_model()
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model  = User
        fields = ("id", "username", "email", "password", "first_name", "last_name")

    def create(self, validated_data):
        user = User.objects.create_user(
            username   = validated_data["username"],
            email      = validated_data["email"],
            first_name = validated_data.get("first_name", ""),
            last_name  = validated_data.get("last_name", ""),
            password   = validated_data["password"],
        )
        return user