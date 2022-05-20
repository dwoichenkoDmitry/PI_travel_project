from django.db import models

# Create your models here.
class Tickets(models.Model):
    startPoint = models.CharField("startPoint", max_length=30)
    finishPoint = models.CharField("finishPoint", max_length=30)
    price = models.CharField(max_length=10)
    sourceLink = models.CharField(max_length=150)
    timeOnWay = models.CharField(max_length=150)

    def __str__(self):
        return self.startPoint