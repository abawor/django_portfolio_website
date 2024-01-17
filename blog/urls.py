from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_page, name='home_page'),
    path('send_email', views.send_email, name='send_email'),
    path('resume', views.resume, name='resume'),
    path('blog', views.post_list, name='blog'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('post/new/', views.post_new, name='post_new'),
    path('post/<int:pk>/edit/', views.post_edit, name='post_edit'),
]