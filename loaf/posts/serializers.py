from rest_framework import serializers

from . import models
from loaf.posts import models as post_models


class FeedPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = post_models.Post
        fields = (
            'id',
            'title',
            'caption',
            'creator',
            'image',
            'file'
        )


class InputPostSerializer(serializers.ModelSerializer):


    class Meta:
        model = models.Post
        fields = (
            'title',
            'caption',
            'file',
            'image'
        )
