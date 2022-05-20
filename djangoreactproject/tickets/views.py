from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Tickets
from .serializers import *


@api_view(['GET', 'POST'])
def tickets_list(request):
    data_ret = []
    serializer = CustomerSerializer(data=request.data)

    mas = getTickets(f"{request.data['start']} ", f"{request.data['finish']} ", f"{request.data['date']}")

    if request.method == 'POST':
        print(mas)
        print("____________________________", request.data['start'])
        return Response({'data': mas}, status=status.HTTP_201_CREATED)


def getTickets(start, finish, date):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    ans_dict = {
        "price": [],
        "start": [],
        "finish": []
    }
    try:
        driver.get(f"https://www.aviasales.ru/search/{dictOfCity.get(start)}{date}{dictOfCity.get(finish)}1?payment_method = all")
        # driver.get(f"https://www.aviasales.ru/search/{dictOfCity.get(start)}{date}{dictOfCity.get(finish)}1?payment_method=all")
        time.sleep(8)
        mas_item = []
        items = driver.find_elements(By.CLASS_NAME, "ticket-desktop")
        print(len(items))
        print(items)
        for item in items:
            price = item.find_element(By.CLASS_NAME, "price_85d2b9c").text
            start = item.find_element(By.CLASS_NAME, "origin")\
                .find_element(By.CLASS_NAME, "segment-route__time").text
            finish = item.find_element(By.CLASS_NAME, "destination")\
                .find_element(By.CLASS_NAME, "segment-route__time").text

            mas_item.append({'price': price, 'start': start, 'finish': finish})
        return mas_item

    except Exception as ex:
        print(ex)
        print("________fgwgw_________"*6)
    finally:
        driver.close()
        driver.quit()




dictOfCity = {
    "Абакан ": "ABA",
    "Анадырь ": "DYR",
    "Анапа ": "AAQ",
    "Апатиты ": "WZA",
    "Архангельск ": "ARH",
    "Астрахань ": "ASF",
    "Балаково ": "BWO",
    "Барнаул ": "BAX",
    "Белгород ": "EGO",
    "Белоярский ": "BCX",
    "БЕРЕЗНИКИ ": "WZC",
    "Благовещенск ": "BQS",
    "Братск ": "BTK",
    "Бугульма ": "UUA",
    "Быково ": "BKA",
    "Чебоксары ": "CSY",
    "Челябинск ": "CEK",
    "Череповец ": "CEE",
    "Чита ": "HTA",
    "ЕЙСК ": "WZD",
    "Екатеринбург ": "SVX",
    "Элиста ": "ESL",
    "Евпатория ": "EV",
    "Геленджик ": "GDZ",
    "Грозный ": "GRV",
    "ХАНТЫ-МАНСИЙСК ": "WZE",
    "Инта ": "INA",
    "Иркутск ": "IKT",
    "Иваново ": "IWA",
    "Ижевск ": "IJK",
    "Калининград ": "KGD",
    "Казань ": "KZN",
    "Кемерово ": "KEJ",
    "Керчь ": "KE",
    "Хабаровск ": "KHV",
    "ХИБИНЫ ": "WZT",
    "Киров ": "KVX",
    "Кировск ": "KVK",
    "Когалым ": "KGP",
    "КОЛХИ ": "WZH",
    "Комсомольск-на-Амуре ": "KXK",
    "КРАЙНИЙ ": "WZI",
    "Краснодар ": "KRR",
    "Красноярск ": "KJA",
    "Курган ": "KRO",
    "Курск ": "KUR",
    "Липецк ": "LPK",
    "Магадан ": "GDX",
    "Магнитогорск ": "MQF",
    "МАЙКОП ": "WZJ",
    "Махачкала ": "MCX",
    "Минеральные Воды ": "MRV",
    "Мирный ": "MJZ",
    "Москва ": "MOW",
    "Мурманск ": "MMK",
    "Набережные Челны ": "NBC",
    "Надым ": "NYM",
    "НАХИЧЕВАНЬ ": "WZL",
    "Нальчик ": "NAL",
    "Нарьян-Мар ": "NNM",
    "НАЗРАНЬ ": "IGT",
    "Нефтeюганск ": "NFG",
    "Нерюнгри ": "NER",
    "Нижневартовск ": "NJC",
    "Нижний Новгород ": "GOJ",
    "Ноябрьск ": "NOJ",
    "Норильск ": "NSK",
    "Великий Новгород ": "GNO",
    "Новокузнецк ": "NOZ",
    "Новосибирск ": "OVB",
    "Новый Уренгой ": "NUX",
    "НЯГАНЬ ": "WZM",
    "Омск ": "OMS",
    "Оренбург ": "REN",
    "Орск ": "OSW",
    "Пенза ": "PEZ",
    "Пермь ": "PEE",
    "Петропавловск-Камчатский ": "PKC",
    "Петрозаводск ": "PES",
    "Певек ": "PWE",
    "Полярный ": "PYJ",
    "Пятигорск ": "PTG",
    "Радужный ": "RAT",
    "Ростов-на-Дону ": "ROV",
    "Салехард ": "SLY",
    "Самара ": "KUF",
    "Саранск ": "SKX",
    "Саратов ": "RTW",
    "Симферополь ": "SIP",
    "СЛЕПЦОВСКАЯ (ИНГУШЕТИЯ) ": "WZN",
    "Сочи / Адлер ": "AER",
    "СОКОЛ ": "WZO",
    "Санкт-Петербург ": "LED",
    "СТАРЫЙ ОСКОЛ ": "WZP",
    "Ставрополь ": "STW",
    "Стрежевой ": "SWT",
    "Сургут ": "SGC",
    "Суздаль ": "SUZ",
    "Сыктывкар ": "SCW",
    "Тикси ": "IKS",
    "Томск ": "TOF",
    "Тверь ": "TVE",
    "Тюмень ": "TJM",
    "Уфа ": "UFA",
    "Ухта ": "UCT",
    "Улан-Удэ ": "UUD",
    "Ульяновск ": "ULY",
    "Усинск ": "USK",
    "Усть-Ильимск ": "UIK",
    "Владикавказ ": "OGZ",
    "Владивосток ": "VVO",
    "Волгодонск ": "VLK",
    "Волгоград ": "VOG",
    "Вологда ": "VGD",
    "Воркута ": "VKT",
    "Воронеж ": "VOZ",
    "Якутск ": "YKS",
    "Южно-Сахалинск ": "UUS"
}