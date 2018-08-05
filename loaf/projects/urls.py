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
        view=views.LikeProject.as_view(),
        name="like_project"
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/unlikes/$',
        view=views.UnLikeProject.as_view(),
        name="unlike_project"
    ),
    url(
        regex=r'comments/(?P<comment_id>[0-9]+)/$',
        view=views.Comment.as_view(),
        name="comment"
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/comments/(?P<comment_id>[0-9]+)/$',
        view=views.ModerateComments.as_view(),
        name="comment_project"
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/comments/$',
        view=views.CommentOnProject.as_view(),
        name="comment_project"
    ),
]