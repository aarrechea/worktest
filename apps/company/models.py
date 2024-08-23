# Imports
from django.db import models
from apps.abstract.models import AbstractModel
from apps.user.models import User



# Company model
class Company(AbstractModel):
    name = models.CharField(max_length=50, unique=True, null=False, blank=False)
    evaluations_made = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'
        ordering = ('name', )




