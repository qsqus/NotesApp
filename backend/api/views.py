from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .serializers import NoteSerializer, UserRegistrationSerializer
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()
            res.data = {'success': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            return res
        except:
            return Response({'success': False})


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            data = request.data.copy()
            data['refresh'] = refresh_token
            request._full_data = data

            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens['access']

            res = Response()
            res.data = {'refreshed': True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res
        except:
            return Response({'refreshed': False})

@api_view(['POST'])
def logout(request):
    try:
        response = Response()

        response.data = {'success': True}
        response.delete_cookie('access_token', path='/', samesite='None')
        response.delete_cookie('refresh_token', path='/', samesite='None')
        
        return response
    except:
        return Response({'success': False})

@api_view(['GET'])
@permission_classes([AllowAny])
def is_authenticated(request):
    return Response({'authenticated': request.user.is_authenticated})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors)

@api_view(['GET', 'POST'])
def notes(request):
    user = request.user

    # View notes
    if request.method == 'GET':
        notes = Note.objects.filter(owner=user)
        serializer = NoteSerializer(notes, many=True)

        return Response(serializer.data)

    # Create new note
    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def note_details(request, id):
    try:
        note = Note.objects.get(id=id)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Vied note details
    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    
    # Edit note
    elif request.method == 'PUT':
        # Set new updated_at datetime
        note.updated_at = timezone.now()

        serializer = NoteSerializer(note, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Delete note
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def search_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)

    query = request.query_params.get('search')

    # Get all note objects that contain the query in title, body or category (case insensitive)
    notes = notes.filter(Q(title__icontains=query) | 
                                Q(body__icontains=query) | 
                                Q(category__icontains=query))
    serializer = NoteSerializer(notes, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)