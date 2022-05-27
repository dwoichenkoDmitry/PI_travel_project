from django.shortcuts import render
from rest_framework.response import Response
from .models import savedTickets
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['POST'])
def ticket_create(request):
    if request.method == 'POST':
        savedTicket = savedTickets(startPoint=request.data['startPoint'], finishPoint=request.data['finishPoint'],
                            startTime=request.data['startTime'], finishTime=request.data['finishTime'],
                            startDate=request.data['startDate'], finishDate=request.data['finishDate'],
                            price=request.data['price'], sourceLink=request.data['sourceLink'],
                            login=request.data['login'])
        savedTicket.save()
        return Response({'data': "saved"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_user_tickets(request, login):
    try:
        tickets = savedTickets.objects.filter(login=login)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        print("_"*20)
        mas = []
        for item in tickets:
            mas.append({'start': item.startPoint, 'finish': item.finishPoint, 'dateStart': item.startDate, 'dateFinish': item.finishDate,
                'price': item.price, 'timeStart': item.startTime, 'timeFinish': item.finishTime, 'link': item.sourceLink})
        print(dict)
        return Response({'items': mas})