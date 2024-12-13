from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):

    CATEGORY = (('BUSINESS', 'Business'), ('PERSONAL', 'Personal'), ('IMPORTANT', 'Important'))

    title = models.CharField(max_length=100)
    body = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY, default='PERSONAL')
    updated_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='note')

    def __str__(self):
        return self.title
