from django.db import models
from loaf.users import models as user_models
from taggit.managers import TaggableManager

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
    members = models.ManyToManyField(user_models.User)
    max_member = models.IntegerField(default=0)
    schedule = models.CharField(default=0, max_length=140)


    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def member_count(self):
        return self.members.all().count()

    def __str__(self):
        return '{} - {}'.format(self.title, self.caption)

    class Meta:
        ordering = ['-created_at']

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
        return 'User: {} - Project Caption: {}'.format(self.creator.username, self.project.caption)