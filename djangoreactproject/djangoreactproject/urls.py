"""djangoreactproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from tickets import views
from django.urls import include, re_path
from users import views as vi
from savedTickets import views as ticketv


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('api/tickets/', views.tickets_list),
    re_path('api/users/', vi.customers_list),
    path('api/user/<str:login>/<str:password>', vi.customers_detail),
    re_path('api/savedTickets/', ticketv.ticket_create),
    path('api/savedTicket/<str:login>/', ticketv.get_user_tickets),
]
