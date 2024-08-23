# Imports
from apps.abstract.serializers import AbstractSerializer
from apps.company.models import Company
from apps.user.models import User
from apps.user.serializers import UserSerializer



# Company serializer
class CompanySerializer(AbstractSerializer):
    def to_representation(self, instance):        
        obj = super().to_representation(instance)        
        user = User.objects.get(id=obj['user'])
        
        obj['user'] = UserSerializer(user).data
                
        return obj
    
    
    def validate_user(self, value):
        print("Just to show - User value in validate: ", value)
                        
        return value
    
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'evaluations_made', 'user', 'created', 'updated']

