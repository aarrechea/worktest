# Imports
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404



# Abstract manager
class AbstractModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
    


