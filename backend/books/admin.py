from django.contrib import admin
from .models import Book
from .utils import scrape_all_books, save_books_to_db

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "availability", "rating", "genre")

    actions = ['import_books_from_website']

    def import_books_from_website(self, request, queryset):
        books = scrape_all_books(max_pages=5)  # наприклад, імпортуємо 5 сторінок
        count = save_books_to_db(books)
        self.message_user(request, f"Імпортовано {count} нових книг.")
    import_books_from_website.short_description = "Імпортувати книги з сайту"
