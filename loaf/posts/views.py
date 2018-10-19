from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from loaf.users import models as user_models
from loaf.users import serializers as user_serializers


# Create your views here.

# Get pont feed, Create posts

class Posts(APIView):

    def get(self, request, fomat=None):

        all_posts = models.Post.objects.all().order_by('-created_at')

        serializer = serializers.FeedPostSerializer(all_posts, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, fomat=None):

        user = request.user

        serializer = serializers.InputPostSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else :

            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentOnPost(APIView):

    def post(self, request, post_id, fomant=True):

        user = request.user

        try: 
            found_post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Respnose(status=status.HTTP_404_NOT_FOUND)


        


