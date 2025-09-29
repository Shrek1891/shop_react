from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from base.models import Product
from base.seraillizers import ProductSerializer


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


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product deleted", status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    data = request.data
    product = Product.objects.create(
        user=request.user,
        name=data['name'],
        price=data['price'],
        brand=data['brand'],
        category=data['category'],
        countInStock=data['countInStock'],
        description=data['description'],
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, pk):
    product = Product.objects.get(_id=pk)
    data = request.data
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
