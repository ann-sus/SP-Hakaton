from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    availability = models.CharField(max_length=100)
    genre = models.CharField(max_length=100, blank=True)
    publication_year = models.IntegerField(null=True, blank=True)
    rating = models.CharField(max_length=20)
    description = models.TextField(default='', blank=True)



    def __str__(self):
        return self.title
