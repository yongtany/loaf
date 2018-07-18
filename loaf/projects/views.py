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


        
        
        
