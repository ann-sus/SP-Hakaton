from django.core.management.base import BaseCommand
from books.utils import scrape_all_books
from books.models import Book

class Command(BaseCommand):
    help = 'Парсинг книг із сайту https://books.toscrape.com'

    def handle(self, *args, **kwargs):
        new_books = 0
        updated_books = 0
        parsed_books = scrape_all_books(max_pages=2)

        for data in parsed_books:
            obj, created = Book.objects.update_or_create(
                title=data["title"],
                defaults={
                    "price": data["price"],
                    "availability": data["availability"],
                    "genre": data["genre"],
                },
            )
            if created:
                new_books += 1
            else:
                updated_books += 1

        self.stdout.write(self.style.SUCCESS(
            f"Парсинг завершено: {new_books} нових книг, {updated_books} оновлено."
        ))
