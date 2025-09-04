from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import MyTokenObtainPairView

urlpatterns = [
    path('users/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.get_routes, name="routes"),
    path('products/', views.get_products, name="products"),
    path('products/<str:pk>/', views.get_product, name="product"),
    path('users/profile', views.get_user_profile, name='user_profile'),
    path('users/', views.get_users, name='users'),


]