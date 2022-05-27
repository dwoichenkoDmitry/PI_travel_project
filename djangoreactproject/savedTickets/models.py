from django.db import models


# Create your models here.
class savedTickets(models.Model):
    startPoint = models.CharField("startPoint", max_length=30)
    finishPoint = models.CharField("finishPoint", max_length=30)
    startTime = models.CharField("startTime", max_length=30)
    finishTime = models.CharField("finishTime", max_length=30)
    startDate = models.CharField("startDate", max_length=30)
    finishDate = models.CharField("finishDate", max_length=30)
    price = models.CharField(max_length=10)
    sourceLink = models.CharField(max_length=150)
    login = models.CharField("login", max_length=30)

    def __str__(self):
        return self.startPoint
