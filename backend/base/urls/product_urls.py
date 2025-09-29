from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from base.views.product_views import get_products, get_product, delete_product, create_product, update_product

urlpatterns = [
    path('', get_products, name="products"),
    path('<str:pk>', get_product, name="product"),
    path("create/", create_product, name="create-product"),
    path("update/<str:pk>/", update_product, name="update-product"),
    path('delete/<str:pk>/', delete_product, name="product-delete"),
]
