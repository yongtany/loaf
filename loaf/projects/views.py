from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from loaf.users import models as user_models
from loaf.users import serializers as user_serializers


# Create your views here.
class Projects(APIView):

    def get(self, request, format=None):

        last_five = models.Project.objects.all().order_by('-created_at') #모든 데이터 가져옴, .order_by(<데이터 키(-:내림차순)>)//데이터 키에따라 정렬

        serializer = serializers.ProjectSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None): #foramt=> output의 출력 형태

        user = request.user

        serializer = serializers.InputProjectSerializer(
                data=request.data, partial=True)

        if serializer.is_valid():

            serializer.save(creator=user) #user를 업데이트 .save() =업데이트
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else :
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST) #오류처리


class LikeProject(APIView):

    def get(self, request, project_id, fomat=None):

        likes = models.Like.objects.filter(project_id=project_id)

        likes_creators_ids = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=likes_creators_ids) #filter(__in :주어진 리스트 안의 자료검색)

        serializer = user_serializers.ListUserSerializer(users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def post(self, request, project_id, format=None):

        user = request.user

        try:
            found_project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.Like.objects.get(
                creator=user,
                project=found_project
            )
            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
                creator=user,
                project=found_project
            )

            notification_view.create_notification(
                user, found_project.creator, 'like', found_project)

            new_like.save()

            return Response(status=status.HTTP_201_CREATED)


class UnLikeProject(APIView):

    def delete(self, request, project_id, format=None):

        user = request.user

        try:
            preexisiting_like = models.Like.objects.get(
                creator=user,
                project__id=project_id
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
                id=comment_id, project__id=project_id, project__creator=user)
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

    def post(self, request, project_id, format=True):

        user = request.user

        try:
            found_project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():
            
            serializer.save(creator=user, project=found_project)

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



class JoinProject(APIView): 

    ## 지원자 리스트만 가져오기
    def get(self, request, project_id, fomat=None):

        members = models.Join.objects.filter(project_id=project_id)

        join_members_ids = members.values('joiner_id')

        users = user_models.User.objects.filter(id__in=join_members_ids)

        serializer = user_serializers.JoinMemberSerializer(users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    ## apt_score 등록과 함께 score_apt로 등록!
    def post(self, request, project_id, format=None):

        user = request.user

        try:
            found_project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_join = models.Join.objects.get(
                joiner=user,
                project=found_project
            )
            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Join.DoesNotExist:

            serializer = serializers.AptScoreInputSerializer(data=request.data)

            if serializer.is_valid():

                serializer.save(joiner=user, project=found_project) #user를 업데이트 .save() =업데이트
                
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)

            else :
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST) #오류처리

"""
class RecommandProject(APIView):

    def get(slef, request, formnat=None):

        user = request.user

        print(user)

        return None
"""


class ProjectsRecommand(APIView):

    def get(self, request, format=None):

        recommand = models.Project.objects.all().reverse()[1:4]

        serializer = serializers.ProjectSerializer(recommand, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class AptView(APIView):

    def get(self, request, project_id, format=True):

        user = request.user
        
        try:
            project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.APTSerializer(project, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class DropMember(APIView): #개설자가 참여자 -> 확정자

    def post(self, request, project_id, join_id, format=None):

        try:
            found_project = models.Project.objects.filter(id=project_id)
            all_joiner = models.Join.objects.all()
            all_joiner.filter(id=join_id).delete()
            
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK)

class OngoingProject(APIView):

    def post(self, request, project_id, format=None):
        user = request.user #요청보낸 유저 (로긘된) 
        pstatus = models.Project.objects.get(id = project_id)
        master_user = pstatus.creator
        if user == master_user:
            try:
                pstatus.project_status = '1'
                pstatus.save()
                return Response(status=status.HTTP_200_OK)

            except models.Project.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        else : 
            return Response(status=status.HTTP_304_NOT_MODIFIED)

class CompletedProject(APIView):

    def post(self, request, project_id, format=None):
        user = request.user #요청보낸 유저 (로긘된) 
        pstatus = models.Project.objects.get(id = project_id)
        master_user = pstatus.creator
        
        if user == master_user:
            try:
                pstatus.project_status = '2'
                pstatus.save()

                return Response(status=status.HTTP_200_OK)

            except models.Project.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        else : 
            return Response(status=status.HTTP_304_NOT_MODIFIED)



class PutApt(APIView):

    def post(self, request, project_id, format=True):

        user = request.user
        
        try:
            found_project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.APTSerializer(project, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


## 지원하기 후 apt_score 다시 입력
"""
class PutAptScore(APIView):

    def post(self, request, project_id, join_id, format=None):

        user = request.user

        try:
            found_project = models.Project.objects.get(id=project_id)
        except models.Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


        try:
            found_joiner = models.Join.objects.get(id=join_id)
        except models.Join.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.AptScoreInputSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(joiner=user, project=found_project) #user를 업데이트 .save() =업데이트
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else :
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST) #오류처리
"""

        

        








        