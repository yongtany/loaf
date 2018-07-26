from django.conf.urls import url
from . import views

app_name='projects'
urlpatterns = [
    url(
        regex=r'^$',
        view=views.Projects.as_view(),
        name='projects'
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/$',
        view=views.ProjectDetail.as_view(),
        name='project_detail'
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/likes/$',
        view=views.LikeImage.as_view(),
        name="like_image"
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/unlikes/$',
        view=views.UnLikeImage.as_view(),
        name="unlike_image"
    ),
    url(
        regex=r'comments/(?P<comment_id>[0-9]+)/$',
        view=views.Comment.as_view(),
        name="comment"
    ),
      
]