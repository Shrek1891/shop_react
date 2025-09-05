from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from  base.views.product_views import get_products, get_product

urlpatterns = [
    path('', get_products, name="products"),
    path('<str:pk>', get_product, name="product"),

]