from django.conf.urls import url
from . import views

app_name='posts'
urlpatterns = [
    url(
        regex=r'^$',
        view=views.Posts.as_view(),
        name='posts'
    ),
    url(
        regex=r'^(?P<post_id>[0-9]+)/comments/$',
        view=views.CommentOnPost.as_view(),
        name="comment_post"
    ),
]

