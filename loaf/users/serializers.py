from rest_framework import serializers
from . import models
from loaf.projects import serializers as projects_serializer

class UserProfileSerializer(serializers.ModelSerializer):

    projects = projects_serializer.CountProjectSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField()  # ReadOnly 해당필드들을 수정하지 않는다.
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    class Meta:
        model = models.User
        fields = (
            'profile_image',
            'username',
            'name',
            'shcool',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
            'projects'
        )


class ListUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name'
        )