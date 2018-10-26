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
        regex=r'^recommand/$',
        view=views.ProjectsRecommand.as_view(),
        name='recommand_projects'
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
    url(
        regex=r'^(?P<project_id>[0-9]+)/join/$',
        view=views.JoinProject.as_view(),
        name="join_project"
    ),
    # 지원하기 후 apt_score 다시 입력
#    url(
#        regex=r'^(?P<project_id>[0-9]+)/aptscore/(?P<join_id>[0-9]+)/$',
#        view=views.PutAptScore.as_view(),
#        name="apt_score"
#    )
    url(
        regex=r'^(?P<project_id>[0-9]+)/apt/$',
        view=views.AptView.as_view(),
        name='project_apt'
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/confirm/(?P<join_id>[0-9]+)/$',
        view=views.DropMember.as_view(),
        name="confirm_member"
    ),
    #시작된 프로젝트
    url(
        regex=r'^(?P<project_id>[0-9]+)/ongoing/$',
        view=views.OngoingProject.as_view(),
        name="ongoning_project"
    ),
    url(
        regex=r'^(?P<project_id>[0-9]+)/complete/$',
        view=views.CompletedProject.as_view(),
        name="completed_project"
    ),
]

