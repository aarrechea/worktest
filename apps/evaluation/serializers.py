# Imports
from apps.abstract.serializers import AbstractSerializer
from apps.company.models import Company
from apps.company.serializers import CompanySerializer
from apps.evaluation.models import Evaluation
from apps.user.models import User
from apps.user.serializers import UserSerializer



# Company serializer
class EvaluationSerializer(AbstractSerializer):
    def to_representation(self, instance):        
        obj = super().to_representation(instance)        
        user = User.objects.get(id=obj['user'])
        company = Company.objects.get(id=obj['company'])
        
        obj['user'] = UserSerializer(user).data
        obj['company'] = CompanySerializer(company).data
                
        return obj
    
    
    def validate_user(self, value):
        print("Just to show - User value in validate: ", value)
                        
        return value
    
    
    class Meta:
        model = Evaluation
        fields = ['id', 'score', 'user', 'company', 'created', 'updated']





