from django.urls import path
from base.views.user_views import MyTokenObtainPairView
from base.views.user_views import get_user_profile, get_users, register_user, update_user_profile

urlpatterns = [

    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', get_user_profile, name='user_profile'),
    path('', get_users, name='users'),
    path('register/', register_user, name='register_user'),
    path('profile/update/', update_user_profile, name='update_user_profile'),
]
