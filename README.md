API документація

для користувацької частини (Users) Базовий URL API
/api/auth/


Логін (отримання JWT токенів)
URL: /api/auth/login/
Метод: POST
Опис: Авторизація користувача. Повертає пару токенів — access та refresh.

json
{
  "username": "your_username",
  "password": "your_password"
}

Успішна відповідь (200 OK):
json
{
  "refresh": "jwt_refresh_token",
  "access": "jwt_access_token"
}

Помилка (401 Unauthorized):
json
{
  "detail": "No active account found with the given credentials"
}


Оновлення токена
URL: /api/auth/token/refresh/
Метод: POST
Опис: Оновлення access токена за допомогою refresh токена.

json
{
  "refresh": "jwt_refresh_token"
}

Успішна відповідь (200 OK):
json
{
  "access": "new_jwt_access_token"
}

Помилка (401):
json
{
    "detail": "Token is invalid",
    "code": "token_not_valid"
}



Отримати профіль користувача
URL: /api/auth/profile/
Метод: GET
Опис: Повертає інформацію про поточного аутентифікованого користувача.
Права доступу: Тільки для авторизованих користувачів (JWT токен в заголовку Authorization: Bearer <token>).

Приклад відповіді (200 OK):
json
{
  "id": 1,
  "username": "user123",
  "email": "user@example.com"
}

Помилка (401 Unauthorized):
json
{
  "detail": "Authentication credentials were not provided."
}



Реєстрація нового користувача
URL: /api/auth/register/
Метод: POST
Опис: Реєстрація нового користувача.

json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "strongpassword"
}

Успішна відповідь (201 Created):
json
{
  "message": "User registered successfully."
}

Помилки (400 Bad Request):
Якщо не всі поля заповнені:
json
{
  "error": "All fields are required."
}

Якщо користувач з таким username вже існує:
json
{
  "error": "Username already exists."
}


Запит на скидання пароля (відправлення email)
URL: /api/auth/password/reset/
Метод: POST
Опис: Відправляє email зі спеціальним посиланням для скидання пароля.

json
{
  "email": "user@example.com"
}

Успішна відповідь (200 OK):
json
{
  "message": "Password reset link sent"
}

Помилки (400 Bad Request):
Якщо поле email не вказане:
json
{
  "error": "Email is required"
}

Якщо користувача з таким email не знайдено:
json
{
  "error": "User with this email does not exist"
}



Підтвердження скидання пароля (встановлення нового)
URL: /api/auth/password/reset/confirm/?uid=<uid>&token=<token>
Метод: POST
Опис: Скидає пароль користувача, якщо uid та token дійсні.

Параметри URL:

uid — зашифрований ID користувача

token — токен для підтвердження

json
{
  "new_password": "newStrongPassword123"
}

Успішна відповідь (200 OK):
json
{
  "message": "Password has been reset"
}

Помилки (400 Bad Request):
Якщо відсутні параметри:
json
{
  "error": "Missing parameters"
}

Якщо uid некоректний:
json
{
  "error": "Invalid uid"
}

Якщо токен недійсний або прострочений:
json
{
  "error": "Invalid or expired token"
}

Для тестування email скидання пароля використовується SMTP-сервер локальний (порт 1025), налаштований у Django (EMAIL_HOST = 'localhost').


