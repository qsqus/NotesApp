from django.urls import path
from .views import (
    notes,
    note_details, 
    search_notes, 
    CustomTokenObtainPairView, 
    CustomTokenRefreshView,
    logout,
    is_authenticated,
    register
    )


urlpatterns = [
    path('notes/', notes, name='notes'),
    path('notes/<int:id>/', note_details, name='note-details'),
    path('notes/search/', search_notes, name='note-search'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout, name='logout'),
    path('authenticated/', is_authenticated, name='authenticated'),
    path('register/', register, name='register'),
]