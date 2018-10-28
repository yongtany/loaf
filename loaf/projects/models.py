from django.db import models
from loaf.users import models as user_models
from taggit.managers import TaggableManager
from django.contrib.postgres.fields import JSONField, ArrayField

# Create your models here.

class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Project(TimeStampedModel):

    """ Project Model """
    file = models.ImageField()
    title = models.TextField(default=0, null=False)
    caption = models.TextField()
    creator = models.ForeignKey(
        user_models.User, on_delete=models.CASCADE, null=True, related_name="projects")
    tags = TaggableManager()
    score = models.IntegerField(default=0, null=True)
    max_member = models.IntegerField(default=1)
    schedule = models.CharField(default=0, max_length=140)
    apt = ArrayField(models.CharField(max_length = 100), default = list)
    # scores_apt = ArrayField(models.IntegerField(default = 0), default = list)
    # 프로젝트 준비중, 시작, 완료의 상태를 정의하는 필드 (0:준비 1:시작 2:완료)
    project_status = models.IntegerField(default=0)
    
   

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def member_count(self):
        return self.join.all().count()

    def __str__(self):
        return '{} - {}'.format(self.title, self.caption)

    class Meta:
        ordering = ['-created_at']



class OngoingProject(TimeStampedModel):
    
    """ On going Project Model """



class Comment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, related_name='comments')

    def __str__(self) :
        return self.message

class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='likes')

    def __str__(self) :
        return 'User: {} - Project Caption: {}'.format(self.creator.username, self.project.title)

class Join(TimeStampedModel):

    """Join Modle """

    joiner = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='join')
    score_apt = models.IntegerField(default=0)
    

    @property
    def project_title(self):
        return self.project.title

    @property
    def project_caption(self):
        return self.project.caption

    def __str__(self):
        return 'User: {} - Project Caption: {}'.format(self.joiner.username, self.project.title)