from django.http import JsonResponse
from .resources import products
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['GET'])
def get_routes(request):
    return JsonResponse("Hello", safe=False)


@api_view(['GET'])
def get_products(request):
    return JsonResponse(products, safe=False)


@api_view(['GET'])
def get_product(request, pk):
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return JsonResponse(product, safe=False)
