from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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
            serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
