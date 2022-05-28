from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import User
from .serializers import *
from django.contrib.auth.models import User


#api добавления пользователя
@api_view(['POST'])
def customers_list(request):
    if request.method == 'POST':
        from django.contrib.auth.models import User
        user = User.objects.create_user(username=request.data['login'],
                                        email=request.data['mail'],
                                        password=request.data['password'])
        user.save()
        return Response({'data': user}, status=status.HTTP_201_CREATED)

#api получения пользователя по логину и паролю
@api_view(['GET'])
def customers_detail(request, login, password):
    try:
        user = User.objects.get(username=login)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        return Response({'check': user.check_password(password), 'mail': user.email})
