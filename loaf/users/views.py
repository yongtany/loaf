from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from loaf.projects import models as project_models
from loaf.projects import serializers as project_serializers

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


from django.core.mail import send_mail
from django.conf import settings


class ExploreUsers(APIView):

    def get(self, request, format=None):

        all_users = models.User.objects.all().order_by('-date_joined')

        serializer = serializers.ListUserSerializer(all_users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.add(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)

class UnFollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.remove(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)

class Search(APIView):

    def get(self, request, format=None):

        username = request.query_params.get('username', None)

        if username is not None:

            users = models.User.objects.filter(username__istartswith=username)

            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):

    def get_user(self, username):

        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None


    def get(self, request, username, format=None):

        found_user = self.get_user(username)

        if found_user is None :
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, username, fomat=None):

        user = request.user

        found_user = self.get_user(username)

        if found_user is None :

            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username :

            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:

            serializer = serializers.InputProfileSerializer(
                found_user, data=request.data, partial=True)
            
            if serializer.is_valid():

                serializer.save()

                return Response(data=serializer.data, status=status.HTTP_200_OK)

            else :

                return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)

    

class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.add(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)


class UnFollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user.following.remove(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)


class UserFollowers(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_user.followers.all()

        serializer = serializers.ListUserSerializer(user_followers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserFollowing(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.following.all()

        serializer = serializers.ListUserSerializer(
            user_following, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ChangePassword(APIView):

    def put(self, request, username, format=None):

        user = request.user
        
        if user.username == username :

            current_password = request.data.get('current_password', None)

            if current_password is not None :

                passwords_match = user.check_password(current_password)

                if passwords_match:

                    new_password = request.data.get('new_password', None)

                    if new_password is not None:

                        user.set_password(new_password)

                        user.save()

                        return Response(status=status.HTTP_200_OK)

                    else :

                        return Response(status=status.HTTP_400_BAD_REQUEST)
                
                else :

                    return Response(status=status.HTTP_400_BAD_REQUEST)
                
            else:

                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
            
class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter



class RecommandUser(APIView):

    def get(self, request, format=None):
        
        user = request.user

        print(user.address)

        ##for i in all_users:
           ## all_users_tags.append(all_users[i].tags.all())

        ##print(all_users_tags)

        serializer = serializers.UserProfileSerializer(user, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UsersRecommand(APIView):

    def get(self, request, format=None):

        recommand = models.User.objects.all().reverse()[1:4]

        serializer = serializers.ListUserSerializer(recommand, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class SendingEmail(APIView):

    def post(self, request, username, fomat=None):

        user = request.user

        user_email = user.email

        # print(user_email)

        try:
            fount_email_recipient = models.User.objects.get(username=username)
        except models.User.DoesNotExist :
            return Response(status=status.HTTP_404_NOT_FOUND)

        recipient_email = fount_email_recipient.email

        # print(recipient_email)

        serializer = serializers.SendEmailSerializer(
                data=request.data, partial=True)

        if serializer.is_valid():

            serializer.save(creator=user) 


            subject = list(serializer.data.items())[1][1]

            message = list(serializer.data.items())[2][1]
            
            send_mail(
                subject=subject, 
                message=message, 
                from_email=settings.EMAIL_HOST_USER, 
                recipient_list=[recipient_email], 
                fail_silently=False
            )
            
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else :
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST) #오류처리

        




class JoinedProject(APIView):

    def get(self, request, username, fomat=None):

        found_user = models.User.objects.get(username=username)

        if found_user is None :
            return Response(status=status.HTTP_404_NOT_FOUND)

        found_joined = project_models.Join.objects.filter(joiner=found_user)

        serializer = project_serializers.JoinedSerializer(found_joined, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)



class JoinedCompletedProject(APIView):

    def get(self, request, username, fomat=None):

        found_user = models.User.objects.get(username=username)

        if found_user is None :
            return Response(status=status.HTTP_404_NOT_FOUND)

        found_joined = project_models.Join.objects.filter(joiner=found_user)

        serializer = project_serializers.JoinedSerializer(found_joined, many=True)

        completed_project = []
        
        for value in serializer.data:

            joined_projects = list(value.items())

            joined_projects_statuses =  joined_projects[3]

            if joined_projects_statuses[1] == 2 :

                completed_project.append(value)

        #print(completed_project)

       
        """

        for key in joined_projects :

            completed_project = []

            if joined_projects[key].get('project_status') == '2' :

                completed_project.append(joined_projects[key])

        """
 

        return Response(data=completed_project, status=status.HTTP_200_OK)

        
        


        



        



        

    

        

        




