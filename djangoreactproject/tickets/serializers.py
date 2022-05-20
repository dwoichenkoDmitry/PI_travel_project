from rest_framework import serializers
from .models import Tickets


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tickets
        fields = ('pk','startPoint', 'finishPoint', 'price', 'sourceLink','timeOnWay')

