API документація

1. Основні URL та ресурси
Шлях	Метод	Опис	Права доступу
/api/auth/	POST / GET	Авторизація, реєстрація, оновлення токенів	Відкритий
/api/books/	GET	Список книг	Відкритий
/api/books/export/excel/ завантаження книг з фільтрами
/api/books/{id}/	GET, PUT, PATCH, DELETE	Деталі, редагування, створення, видалення книг	Адмін для зміни, всі для читання
/api/books/scrape/	POST	Парсинг книг із зовнішнього сайту і збереження	Лише адмін
/admin/	GET	Панель адміністратора	Адмін
/	GET	Головна сторінка (з додатку home)	Відкритий



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


Вихід з акаунту (Logout)
URL: /api/auth/logout/
Метод: POST
Цей ендпоінт дозволяє користувачу вийти з системи, відкликавши (заблокувавши) його refresh токен. Після виклику logout користувач більше не зможе використовувати цей refresh токен для отримання нових access токенів.

Увага: Access токен, який був виданий до logout, залишається чинним до закінчення терміну дії.

Authorization: Bearer <access_token> — обов’язковий. Access токен користувача.

Content-Type: application/json
Тіло запиту (Request Body)
json
{
  "refresh": "<refresh_token>"
}

Успіх
HTTP статус: 200 OK
Тіло відповіді:

json
{
  "detail": "Logged out successfully."
}

Помилки
Статус	Опис	Причина
401	Authentication credentials were not provided.	Відсутній або неправильний access токен в заголовку.
400	Bad request	Некоректний або відсутній refresh токен у тілі запиту.
401	Token is invalid or expired	Refresh токен недійсний або вже відкликаний.






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

Зміна паролю в профілі
PUT /api/auth/change-password/
Цей ендпоінт дозволяє авторизованому користувачу змінити власний пароль, перебуваючи у своєму профілі (без надсилання email).

Авторизований користувач (через access token)

json
{
  "old_password": "current_password",
  "new_password": "NewStrongPass123!"
}

new_password проходить через стандартну валідацію Django:

Мінімум 8 символів

Не повинен бути занадто простим або лише числовим

200 OK (успішна зміна):

json
{
  "message": "Password updated successfully"
}
400 Bad Request (невірний пароль або слабкий новий):

json
{
  "new_password": [
    "This password is too short. It must contain at least 8 characters.",
    "This password is too common.",
    "This password is entirely numeric."
  ]
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








для книжок (Books) Базовий URL API /api/books/

GET /api/books/

Отримати список усіх книг.

Відповідь:
json
[
  {
    "id": 1,
    "title": "Book Title",
    "price": "19.99",
    "availability": "In stock",
    "genre": "Fiction",
    "publication_year": 2020,
    "rating": "Four",
    "description": "A great book"
  },
  ...
]



Деталі книги
GET /api/books/{id}/
Отримати дані конкретної книги.

Відповідь:
json
[
  {
    "id": 1,
    "title": "Book Title",
    "price": "19.99",
    "availability": "In stock",
    "genre": "Fiction",
    "publication_year": 2020,
    "rating": "Four",
    "description": "A great book"
  }
]

........................................................................................................
тільки для адміна це з токеном адмінського акаунту(JWT токен в заголовку Authorization: Bearer <token>).
........................................................................................................

Додати нову книгу (тільки для адміна)
POST /api/books/
Приклад запиту:

json
{
  "title": "New Book",
  "price": "9.99",
  "availability": "In stock",
  "genre": "Sci-Fi",
  "publication_year": 2023,
  "rating": "Five",
  "description": "Exciting space adventure"
}


Оновити книгу (тільки для адміна)
PUT /api/books/{id}/


❌ Видалити книгу (тільки для адміна)
DELETE /api/books/{id}/


Спарсити книги з https://books.toscrape.com
POST /api/books/scrape/
Витягує книги з сайту та зберігає в базу (тільки для адміна)
Відповідь:
json
{
  "message": "Books scraped and saved successfully."
}







Головна сторінка (home)
/
Метод: GET
Опис:
Головна сторінка сайту. Відображає просте привітання або базову інформацію про проєкт/API.

Приклад відповіді (JSON):

json
{
  "message": "Welcome to the Book API Home Page!"
}

Призначення:

Перевірити, що API працює

Використовується як загальна точка входу (root endpoint)

Доступ:

Відкритий для всіх (без автентифікації)










