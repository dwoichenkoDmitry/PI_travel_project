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

    mas = getTicketsAvia(f"{request.data['start']}", f"{request.data['finish']}", f"{request.data['date']}")
    #mas2 = getTicketsTrain(f"{request.data['start']}", f"{request.data['finish']}", f"{request.data['date']}")

    if request.method == 'POST':
        return Response({'data': mas}, status=status.HTTP_201_CREATED)


def getTicketsAvia(start, finish, date):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    print(dictOfCity.get(start)[0])
    print(date)
    print(dictOfCity.get(finish)[0])
    ans_dict = {
        "price": [],
        "start": [],
        "finish": []
    }
    try:



        driver.get(f"https://www.aviasales.ru/search/{dictOfCity.get(start)[0]}{date}{dictOfCity.get(finish)[0]}1?payment_method=all")

        # driver.get(f"https://www.aviasales.ru/search/{dictOfCity.get(start)}{date}{dictOfCity.get(finish)}1?payment_method=all")
        time.sleep(6)
        mas_item = []
        items = driver.find_elements(By.CLASS_NAME, "ticket-desktop")
        for item in items:
            price = item.find_element(By.CLASS_NAME, "price_85d2b9c").text
            startTime = item.find_element(By.CLASS_NAME, "origin")\
                .find_element(By.CLASS_NAME, "segment-route__time").text
            finishTime = item.find_element(By.CLASS_NAME, "destination")\
                .find_element(By.CLASS_NAME, "segment-route__time").text
            startDate = item.find_element(By.CLASS_NAME, "origin") \
                .find_element(By.CLASS_NAME, "segment-route__date").text
            finishDate = item.find_element(By.CLASS_NAME, "destination") \
                .find_element(By.CLASS_NAME, "segment-route__date").text
            link = f"https://www.aviasales.ru/search/{dictOfCity.get(start)}{date}{dictOfCity.get(finish)}1?payment_method = all"

            mas_item.append({'price': price, 'startTime': startTime, 'finishTime': finishTime, 'startDate': startDate, 'finishDate': finishDate, 'link': link})

        return mas_item

    except Exception as ex:
        print(ex)
        print("________fgwgw_________"*6)
    finally:
        driver.close()
        driver.quit()

#
# def getTicketsTrain(start,finish,date):
#     date = f'2022-{date[-2:]}-{date[:2]}'
#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
#     try:
#         print("_@#$_"*20)
#         print(f"https://ticket.rzd.ru/searchresults/v/1/{dictOfCity.get(start)[1]}/{dictOfCity.get(finish)[1]}/{date}")
#         driver.get(f"https://ticket.rzd.ru/searchresults/v/1/{dictOfCity.get(start)[1]}/{dictOfCity.get(finish)[1]}/{date}")
#         # driver.get(f"https://www.aviasales.ru/search/{dictOfCity.get(start)}{date}{dictOfCity.get(finish)}1?payment_method=all")
#         time.sleep(3)
#         mas_item = []
#         items = driver.find_elements(By.CLASS_NAME, "card__body")
#         for item in items:
#             price = item.find_element(By.CLASS_NAME, "item__sum")[0].text
#             # startTime = item.find_element(By.CLASS_NAME, "origin")\
#             #     .find_element(By.CLASS_NAME, "segment-route__time").text
#             # finishTime = item.find_element(By.CLASS_NAME, "destination")\
#             #     .find_element(By.CLASS_NAME, "segment-route__time").text
#             # startDate = item.find_element(By.CLASS_NAME, "origin") \
#             #     .find_element(By.CLASS_NAME, "segment-route__date").text
#             # finishDate = item.find_element(By.CLASS_NAME, "destination") \
#             #     .find_element(By.CLASS_NAME, "segment-route__date").text
#             # link = f"https://www.aviasales.ru/search/{dictOfCity.get(start)}{date}{dictOfCity.get(finish)}1?payment_method = all"
#             print("_4_5_"*20)
#             print(price)
#             # mas_item.append({'price': price, 'startTime': startTime, 'finishTime': finishTime, 'startDate': startDate, 'finishDate': finishDate, 'link': link})
#
#         return mas_item
#
#     except Exception as ex:
#         print(ex)
#         print("________fgwgw_________"*6)
#     finally:
#         driver.close()
#         driver.quit()


dictOfCity = {
    "Абакан": ["ABA", "5a13baab340c745ca1e7f31c"],
    "Анадырь": ["DYR", "5a13bdb7340c745ca1e8a792"],
    "Анапа": ["AAQ", "5a13ba89340c745ca1e7ebbe"] ,
    "Апатиты": ["WZA", "5a13bd39340c745ca1e889b7"],
    "Архангельск": ["ARH", "5a13baf9340c745ca1e80436"],
    "Астрахань": ["ASF", "5a13bd6d340c745ca1e895f8"],
    "Балаково": ["BWO", "5a13ba84340c745ca1e7ea67"],
    "Барнаул": ["BAX", "5a8ac561340c7425a3d36738"],
    "Белгород": ["EGO", "5a13ba2f340c745ca1e7d701"],
    "Белоярский": ["BCX", "5a13cea8340c745ca1ec9955"],
    "БЕРЕЗНИКИ": ["WZC", "5a13bd01340c745ca1e87c4a"],
    "Благовещенск": ["BQS", "5a13bd61340c745ca1e89312"],
    "Братск": ["BTK", "5a13bcc9340c745ca1e86eeb"],
    "Бугульма": ["UUA", "5a13bd44340c745ca1e88c38"],
    "Быково": ["BKA", "5a13ccf4340c745ca1ec347b"],
    "Чебоксары": ["CSY", "5a13bb25340c745ca1e80dc5"],
    "Челябинск": ["CEK", "5a13bdfb340c745ca1e8b7b5"],
    "Череповец": ["CEE", "5a13bab1340c745ca1e7f48f"],
    "Чита": ["HTA", "5a13bd59340c745ca1e89118"],
    "ЕЙСК": ["WZD", "5a13ba8e340c745ca1e7ecf1"],
    "Екатеринбург": ["SVX", "5a13bd7e340c745ca1e89a08"],
    "Элиста": ["ESL", "5a13b9bb340c745ca1e7bd4e"],
    "Евпатория": ["EV", "5a13b983340c745ca1e7b2de"],
    "Геленджик": ["GDZ", "5a13ba86340c745ca1e7eb10"],
    "Грозный": ["GRV", "5a13bb1d340c745ca1e80c44"],
    "ХАНТЫ-МАНСИЙСК": ["WZE", "5a13bdee340c745ca1e8b473"],
    "Инта": ["INA", "5a13ba6d340c745ca1e7e57d"],
    "Иркутск": ["IKT", "5a13bcd8340c745ca1e87291"],
    "Иваново": ["IWA", "5a13ba3d340c745ca1e7da6e"],
    "Ижевск": ["IJK", "5a13bca4340c745ca1e8668d"],
    "Калининград": ["KGD", "5a13bc60340c745ca1e85669"],
    "Казань": ["KZN", "5a13bd41340c745ca1e88b55"],
    "Кемерово": ["KEJ", "5a13bd03340c745ca1e87cdc"],
    "Керчь": ["KE", "5a13b979340c745ca1e7b113"],
    "Хабаровск": ["KHV", "5a13bd35340c745ca1e888a1"],
    "ХИБИНЫ": ["WZT", "5a13c4cc340c745ca1ea50e3"],
    "Киров": ["KVX", "5a13bd6b340c745ca1e89595"],
    "Кировск": ["KVK", "5a13bd38340c745ca1e88972"],
    "Когалым": ["KGP", "5a13bdf0340c745ca1e8b502"],
    "КОЛХИ": ["WZH", ""],
    "Комсомольск-на-Амуре": ["KXK", "5a13bd37340c745ca1e88936"],
    "КРАЙНИЙ": ["WZI", ""],
    "Краснодар": ["KRR", "5a13ba81340c745ca1e7e9a5"],
    "Красноярск": ["KJA", "5a13bd76340c745ca1e8980b"],
    "Курган": ["KRO", "5a13bcb3340c745ca1e869d5"],
    "Курск": ["KUR", "5a13bcbc340c745ca1e86bff"],
    "Липецк": ["LPK", "5a13bd43340c745ca1e88bd7"],
    "Магадан": ["GDX", "5a13bc9f340c745ca1e86533"],
    "Магнитогорск": ["MQF", "5a13be03340c745ca1e8b9bb"],
    "МАЙКОП": ["WZJ", "5a13ba43340c745ca1e7dbf4"],
    "Махачкала": ["MCX", "5a13ba7a340c745ca1e7e889"],
    "Минеральные Воды": ["MRV", "5a13ba94340c745ca1e7ee67"],
    "Мирный": ["MJZ", "5a13cddd340c745ca1ec69ff"],
    "Москва": ["MOW", "5a323c29340c7441a0a556bb"],
    "Мурманск": ["MMK", "5a13bd34340c745ca1e88886"],
    "Набережные Челны": ["NBC", "5a13bd40340c745ca1e88b09"],
    "Надым": ["NYM", "5a13bdbd340c745ca1e8a8cb"],
    "НАХИЧЕВАНЬ": ["WZL", "5a13bdbd340c745ca1e8a8cb"],
    "Нальчик": ["NAL", "5a13b96b340c745ca1e7af87"],
    "Нарьян-Мар": ["NNM", "5a13bdac340c745ca1e8a4d1"],
    "НАЗРАНЬ": ["IGT", "5a13b979340c745ca1e7b11f"],
    "Нефтeюганск": ["NFG", "5a13bdf3340c745ca1e8b5a2"],
    "Нерюнгри": ["NER", "5a13ba89340c745ca1e7eb9f"],
    "Нижневартовск": ["NJC", "5a13bdeb340c745ca1e8b3e4"],
    "Нижний Новгород": ["GOJ", "5a13ba1a340c745ca1e7d247"],
    "Ноябрьск": ["NOJ", "5a13bdc5340c745ca1e8aada"],
    "Норильск": ["NSK", "5a13bd82340c745ca1e89b07"],
    "Великий Новгород": ["GNO", "5a13b9f1340c745ca1e7c924"],
    "Новокузнецк": ["NOZ", "5a13bd0d340c745ca1e87f2c"],
    "Новосибирск": ["OVB", "5a13bd09340c745ca1e87e37"],
    "Новый Уренгой": ["NUX", "5a13bdc3340c745ca1e8aa54"],
    "НЯГАНЬ": ["WZM", "5a13bdef340c745ca1e8b4b7"],
    "Омск": ["OMS", "5a13bba2340c745ca1e829ec"],
    "Оренбург": ["REN", "5a13bbaa340c745ca1e82bf2"],
    "Орск": ["OSW", "5a13bbae340c745ca1e82d15"],
    "Пенза": ["PEZ", "5a13ba4c340c745ca1e7ddf0"],
    "Пермь": ["PEE", "5a13bd04340c745ca1e87d29"],
    "Петропавловск-Камчатский": ["PKC", "5a13ba7b340c745ca1e7e8ba"],
    "Петрозаводск": ["PES", "5a13ba45340c745ca1e7dc8d"],
    "Певек": ["PWE", "5a13bdb8340c745ca1e8a7e0"],
    "Полярный": ["PYJ", "5a13bd3a340c745ca1e889fe"],
    "Пятигорск": ["PTG", "5a13b9e6340c745ca1e7c695"],
    "Радужный": ["RAT", "5a13bdf8340c745ca1e8b6d7"],
    "Ростов-на-Дону": ["ROV", "5a13bd12340c745ca1e88055"],
    "Салехард": ["SLY", "5a13bdc1340c745ca1e8a9bc"],
    "Самара": ["KUF", "5a13bc15340c745ca1e844e3"],
    "Саранск": ["SKX", "5a13ba5e340c745ca1e7e22a"],
    "Саратов": ["RTW", "5a13ba86340c745ca1e7eb03"],
    "Симферополь": ["SIP", "5a13b980340c745ca1e7b24b"],
    "ИНГУШЕТИЯ": ["WZN", ""],
    "Сочи": ["AER", "5a26d1b8340c7439aba50da5"],
    "СОКОЛ": ["WZO", "5a13bb49340c745ca1e815b4"],
    "Санкт-Петербург": ["LED", "5a3244bc340c7441a0a556ca"],
    "СТАРЫЙ ОСКОЛ": ["WZP", "5a13ba32340c745ca1e7d7df"],
    "Ставрополь": ["STW", "5a13b9eb340c745ca1e7c78a"],
    "Стрежевой": ["SWT", "5a13bd3c340c745ca1e88a88"],
    "Сургут": ["SGC", "5a13bde7340c745ca1e8b319"],
    "Суздаль": ["SUZ", "5a13ba69340c745ca1e7e469"],
    "Сыктывкар": ["SCW", "5a13ba6b340c745ca1e7e4eb"],
    "Тикси": ["IKS", "5a13bd9b340c745ca1e8a106"],
    "Томск": ["TOF", "5a13bd40340c745ca1e88b1a"],
    "Тверь": ["TVE", "5a13bca2340c745ca1e865e9"],
    "Тюмень": ["TJM", "5a13bdd6340c745ca1e8aebf"],
    "Уфа": ["UFA", "5a13bb05340c745ca1e806e2"],
    "Ухта": ["UCT", "5a13ba70340c745ca1e7e64a"],
    "Улан-Удэ": ["UUD", "5a13baa1340c745ca1e7f0ce"],
    "Ульяновск": ["ULY", "5a13bd68340c745ca1e894cd"],
    "Усинск": ["USK", "5a13ba6f340c745ca1e7e607"],
    "Усть-Ильимск": ["UIK", "5a13bcd0340c745ca1e87095"],
    "Владикавказ": ["OGZ", "5a13ba55340c745ca1e7e038"],
    "Владивосток": ["VVO", "5a13bd30340c745ca1e88771"],
    "Волгодонск": ["VLK", "5a13bd1e340c745ca1e8834e"],
    "Волгоград": ["VOG", "5a13bbc8340c745ca1e8331f"],
    "Вологда": ["VGD", "5a13babb340c745ca1e7f667"],
    "Воркута": ["VKT", "5a13ba6a340c745ca1e7e497"],
    "Воронеж": ["VOZ", "5a13baa7340c745ca1e7f215"],
    "Якутск": ["YKS", "5a13ba8a340c745ca1e7ebf1"],
    "Южно-Сахалинск": ["UUS", "5a13ba2d340c745ca1e7d693"]
}