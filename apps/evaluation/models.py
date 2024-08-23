# Imports
from django.db import models
from apps.abstract.models import AbstractModel
from apps.company.models import Company
from apps.user.models import User



# Evaluation model
class Evaluation(AbstractModel):    
    score = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)


    class Meta:
        verbose_name = 'Evaluation'
        verbose_name_plural = 'Evaluations'
        ordering = ('company', '-updated', '-created' )