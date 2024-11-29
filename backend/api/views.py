from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
from django.db.models import Q
from django.utils import timezone

# Create your views here.

@api_view(['GET', 'POST'])
def notes(request):
    # View notes
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)

        return Response(serializer.data)

    # Create new note
    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

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
    query = request.query_params.get('search')
    # Get all note objects that contain the query in title, body or category (case insensitive) 
    notes = Note.objects.filter(Q(title__icontains=query) | 
                                Q(body__icontains=query) | 
                                Q(category__icontains=query))
    serializer = NoteSerializer(notes, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)