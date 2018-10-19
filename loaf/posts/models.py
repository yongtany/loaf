from django.db import models
from loaf.users import models as user_models

# Create your models here.


class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(TimeStampedModel):

    """ Post Model """

    title = models.TextField(null=False)
    caption = models.TextField(null=False)
    creator = models.ForeignKey(
        user_models.User, on_delete=models.CASCADE, null=True, related_name="posts")
    image = models.ImageField(blank=True, null=True)
    file = models.FileField(blank=True, null=True)


    class Meta:
        ordering = ['-created_at']


class PostComment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, related_name='comments')

    def __str__(self) :
        return self.message