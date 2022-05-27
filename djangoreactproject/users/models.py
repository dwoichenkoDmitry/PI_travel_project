from django.db import models

# Create your models here.
class User(models.Model):
    nameUser = models.CharField("First name", max_length=255)
    login = models.CharField("Login", max_length=255)
    password = models.CharField("Password", max_length=255)

    def __str__(self):
        return self.nameUser