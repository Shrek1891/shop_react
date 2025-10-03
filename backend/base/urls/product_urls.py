from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from base.views.product_views import get_products, get_product, delete_product, create_product, update_product, \
    upload_image, create_product_review

urlpatterns = [
    path('', get_products, name="products"),
    path('<str:pk>', get_product, name="product"),
    path("create/", create_product, name="create-product"),
    path("upload/", upload_image, name="upload-image"),
    path("update/<str:pk>/", update_product, name="update-product"),
    path('delete/<str:pk>/', delete_product, name="product-delete"),
    path('<str:pk>/reviews/', create_product_review, name="create-product-review"),
]
