from django.urls import path

from base.views.order_views import add_order_items, get_orders, update_order_to_paid, get_my_orders

urlpatterns = [
    path('add/', add_order_items, name='add-order-items'),
    path('myorders/', get_my_orders, name='my-orders'),
    path('<str:pk>/', get_orders, name='user-order'),
    path('<str:pk>/pay/', update_order_to_paid, name='update-order-to-paid'),

]