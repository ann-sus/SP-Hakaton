from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255, blank=True, null=True)
    genre = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True, null=True)
    coverUrl = models.URLField(max_length=500, blank=True, null=True)
    publication_year = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title
