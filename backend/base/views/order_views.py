import datetime

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Order, ShippingAddress, Product, OrderItem
from base.seraillizers import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data
    order_items = data['orderItems']
    if order_items and len(order_items) == 0:
        return Response({"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['zip'],
            country=data['shippingAddress']['state'],
        )
        print(shipping)
        for i in order_items:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                order=order,
                product=product,
                name=product.name,
                qty=int(i['qty']),
                price=float(i['price']),
                image=product.image.url,
            )
            product.countInStock = int(product.countInStock) - int(item.qty)
            product.save()
            order.shippingAddress = shipping
            order.save()

    serializer = OrderSerializer(order, many=True)
    return Response(order._id, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            message = {"detail": "You are not authorized to view this order"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except:
        message = {"detail": "Order not found"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    oder = Order.objects.get(_id=pk)
    oder.isPaid = True
    oder.paidAt = datetime.datetime.now()
    oder.save()
    return Response('order paid')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_order_by_id(request, pk):
    order = Order.objects.get(_id=pk)
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_to_delivered(request, pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.datetime.now()
    order.save()
    return Response('order delivered')