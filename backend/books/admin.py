from django.contrib import admin, messages
from django.urls import path
from django.shortcuts import render, redirect
from .models import Book
from .utils import scrape_all_books, save_books_to_db

@admin.action(description='Оновити книги з сайту')
def update_books(modeladmin, request, queryset):
    books = scrape_all_books(max_pages=3)
    created, updated = save_books_to_db(books)
    modeladmin.message_user(request, f"Створено {created} нових, оновлено {updated} існуючих книг.", messages.SUCCESS)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'availability', 'genre', 'rating')
    actions = [update_books]


    def get_urls(self):
        urls = super().get_urls()
        custom = [
            path('scrape/', self.admin_site.admin_view(self.scrape_view), name='books_scrape'),
        ]
        return custom + urls

    def scrape_view(self, request):
        if request.method == 'POST':
            pages = int(request.POST.get('pages', 1))
            books = scrape_all_books(pages)
            created, updated = save_books_to_db(books)
            self.message_user(request,
                f"Створено {created} нових, оновлено {updated} існуючих книг.",
                messages.SUCCESS)
            return redirect('admin:books_book_changelist')
        return render(request, "admin/books/scrape_form.html", {
            "title": "Скрапінг книг",
            "opts": self.model._meta,
        })
