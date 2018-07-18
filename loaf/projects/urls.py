from django.conf.urls import url
from . import views

app_name='project'
urlpatterns = [
    url(
        regex=r'^projects/$',
        view=views.Projects.as_view(),
        name='projects'
    )
]