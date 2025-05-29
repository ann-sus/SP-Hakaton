from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    availability = models.CharField(max_length=100)
<<<<<<< HEAD
    genre = models.CharField(max_length=100, blank=True)
    publication_year = models.IntegerField(null=True, blank=True)
    rating = models.CharField(max_length=20)
    description = models.TextField(default='', blank=True)


=======
    rating = models.CharField(max_length=20)
    genre = models.CharField(max_length=100)
    description = models.TextField()
>>>>>>> 6dee463c5b8397beb92ff5cd5e90308ffd4d007b

    def __str__(self):
        return self.title
