from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    availability = models.CharField(max_length=100)
    rating = models.CharField(max_length=20)
    genre = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

