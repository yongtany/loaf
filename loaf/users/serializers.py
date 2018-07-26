from rest_framework import serializers
from . import models
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from loaf.projects import serializers as projects_serializer

class UserProfileSerializer(TaggitSerializer, serializers.ModelSerializer):

    projects = projects_serializer.CountProjectSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField()  # ReadOnly 해당필드들을 수정하지 않는다.
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    tags = TagListSerializerField()

    class Meta:
        model = models.User
        fields = (
            'profile_image',
            'username',
            'name',
            'school',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
            'projects',
            'tags'
        )


class ListUserSerializer(TaggitSerializer, serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'school',
            'tags'
        )

class InputProfileSerializer(TaggitSerializer, serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = models.User
        fields = (
            'address',
            'school',
            'major',
            'bio',
            'tags',
            'profile_image'
        )