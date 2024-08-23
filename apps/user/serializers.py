# Imports
from apps.abstract.serializers import AbstractSerializer
from apps.user.models import User



# User serializer
class UserSerializer(AbstractSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'full_name', 'is_active', 'created', 'updated']
        read_only_fields = ['is_active']



