from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from .resources import products
from rest_framework.decorators import api_view
from .models import Product
from .seraillizers import ProductSerializer


# Create your views here.
@api_view(['GET'])
def get_routes(request):
    return JsonResponse("Hello", safe=False)


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_product(request, pk):
    product = None
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)
