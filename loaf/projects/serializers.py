from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from . import models
from loaf.users import models as user_models

class CountProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        fields = (
            'id',
            'file',
            'title',
            'comment_count',
            'like_count',
            'score',
            'members',
        )

class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )

class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
            'id',
            'message',
            'creator',
        )

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )

class ProjectSerializer(TaggitSerializer, serializers.ModelSerializer):

    comments = CommentSerializer(many=True)
    creator = FeedUserSerializer()
    tags = TagListSerializerField()
    members = MemberSerializer(many=True)
    

    class Meta:
        model = models.Project
        fields = (
            'id',
            'file',
            'title',
            'caption',
            'comments',
            'like_count',
            'creator',
            'tags',
            'score',
            'members',
            'max_member',
            'schedule'
        )

class InputProjectSerializer(serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = models.Project
        fields = (
            'file',
            'title',
            'caption',
            'max_member',
            'schedule',
            'tags'
        )