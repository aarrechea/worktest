#Imports
from rest_framework.permissions import BasePermission, SAFE_METHODS



# User permissions
class UserPermissions(BasePermission):
    BASENAME_ARRAY = ['company', 'evaluation']
    
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return request.method in SAFE_METHODS
                        
        if view.basename in self.BASENAME_ARRAY:
            if request.method in ['DELETE']:                
                # If the user is superuser or the user created the element to delete
                return bool(request.user.is_superuser or request.user in [obj.user])
            
            return bool(request.user and request.user.is_authenticated)
        
        return False
    
    
    
    def has_permission(self, request, view):                        
        if view.basename in self.BASENAME_ARRAY:
            if request.user.is_anonymous:
                return request.method in SAFE_METHODS
            
            return bool(request.user and request.user.is_authenticated)
        
        return False

