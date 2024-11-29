from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.notes, name='notes'),
    path('notes/<int:id>/', views.note_details, name='note-details'),
    path('notes/search/', views.search_notes, name='note-search')
]