from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers

# Create your views here.
class Projects(APIView):

    def get(self, request, format=None):

        last_five = models.Project.objects.all().order_by('-created_at')[:5]

        serializer = serializers.ProjectSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        user = request.user

        serializer = serializers.InputProjectSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user)
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else :
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeImage(APIView):

    def get(self, request, project_id, fomat=None):

        likes = models.Like.objects.filter(project_id=project_id)

        likes_creators_ids = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=likes_creators_ids)

        serializer = user_serializers.ListUserSerializer(users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def post(self, request, project_id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=project_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.Like.objects.get(
                creator=user,
                image=found_image
            )
            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
                creator=user,
                image=found_image
            )

            notification_view.create_notification(
                user, found_image.creator, 'like', found_image)

            new_like.save()

            return Response(status=status.HTTP_201_CREATED)


class UnLikeImage(APIView):

    def delete(self, request, project_id, format=None):

        user = request.user

        try:
            preexisiting_like = models.Like.objects.get(
                creator=user,
                image__id=project_id
            )
            preexisiting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:

            return Response(status=status.HTTP_304_NOT_MODIFIED)

class ModerateComments(APIView):

    def delete(self, request, project_id, comment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.Comment.objects.get(
                id=comment_id, image__id=project_id, image__creator=user)
            comment_to_delete.delete()
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)

class ProjectDetail(APIView):

    def find_own_project(self, project_id, user):
        try:
            project = models.Project.objects.get(id=project_id, creator=user)
            return project
        except models.Project.DoesNotExist:
            return None

    def get(self, request, project_id, format=True):

        user = request.user
        
        try:
            project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ProjectSerializer(project, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, project_id, format=True):

        user = request.user

        project = self.find_own_project(project_id, user)

        if project is None :

            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.InputProjectSerializer(
            project, data=request.data, partial=True) # 완료되지 않은 업데이트를 하기위함
                                                    

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        else:

            return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, project_id, format=True):

        user = request.user

        project = self.find_own_image(project_id, user)

        if project is None :
            
            return Response(status=status.HTTP_400_BAD_REQUEST)

        project.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentOnProject(APIView):

    def post(self, request, image_id, format=True):

        user = request.user

        try:
            found_project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():
            
            serializer.save(creator=user, image=found_image)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else :

            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Comment(APIView):

    def delete(self, request, comment_id, format=True):

        user= request.user

        try:
            comment = models.Comment.objects.get(id=comment_id, creator=user)

            comment.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Comment.DoesNotExist:

            return Response(status=status.HTTP_404_NOT_FOUND)


        
        
        
