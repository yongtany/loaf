from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
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
            'tags',
            'address',
            'major'
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
            'profile_image',
            'address',
            'school',
            'major',
            'website',
            'bio',
            'tags',   
        )


class SignUpSerializer(RegisterSerializer):

    name = serializers.CharField(required=True, write_only=True)

    def get_cleaned_data(self):
        return {
            'name': self.validated_data.get('name', ''),
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', '')
        }
    
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user