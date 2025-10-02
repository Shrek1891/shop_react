from django.urls import path

from base.views.order_views import add_order_items, get_orders, update_order_to_paid, get_my_orders, get_order_by_id, \
    get_all_orders

urlpatterns = [
    path('add/', add_order_items, name='add-order-items'),
    path('myorders/', get_my_orders, name='my-orders'),
    path('<str:pk>/', get_orders, name='user-order'),
    path('<str:pk>/pay/', update_order_to_paid, name='update-order-to-paid'),
    path('', get_all_orders, name='get_orders'),
    path('<str:pk>/', get_order_by_id, name='get_order_by_id'),
]
