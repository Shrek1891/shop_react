from django.urls import path

from base.views.order_views import add_order_items, get_orders

urlpatterns = [
    path('add/', add_order_items, name='add-order-items'),
    path('<str:pk>/', get_orders, name='user-order'),

]