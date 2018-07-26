from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from taggit.managers import TaggableManager
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):

    """ User Model """

    # First Name and Last Name do not cover name patterns
    # around the globe.

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('not-specified', 'Not specified')
    )
    profile_image = models.ImageField(null=True)
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    website = models.URLField(null=True)
    bio = models.TextField(null=True)
    school = models.CharField(max_length=200, null=True)
    major = models.CharField(max_length=200, null=True)
    address = models.CharField(max_length=200, null=True)
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True)
    followers = models.ManyToManyField("self", blank=True)
    following = models.ManyToManyField("self", blank=True)
    tags = TaggableManager()

     

    def __str__(self):
        return self.username

    @property
    def post_count(self):
        return self.projects.all().count()

    @property
    def followers_count(self):
        return self.followers.all().count()

    @property
    def following_count(self):
        return self.following.all().count()