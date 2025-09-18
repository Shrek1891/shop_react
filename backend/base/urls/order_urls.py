from django.urls import path

from base.views.order_views import add_order_items

urlpatterns = [
    path('add/', add_order_items, name='add-order-items'),

]