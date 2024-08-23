# Imports
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.abstract.viewsets import AbstractViewSet
from apps.auth.permissions import UserPermissions
from apps.company.serializers import CompanySerializer
from apps.company.models import Company



# Company viewset
class CompanyViewSet(AbstractViewSet):
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = (UserPermissions, )
    serializer_class = CompanySerializer  


    # GET all
    def get_queryset(self):                        
        queryset = Company.objects.all()
                
        return queryset
        
    
    # GET object
    def get_object(self):        
        obj = Company.objects.get(id=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)        
        
        return obj


    # POST create
    def create(self, request, *args, **kwargs):                
        serializer = self.get_serializer(data=request.data)                
        
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("\nSerializer errors: ", serializer.errors)
            
            return Response(serializer.errors)
        
                        
    # DELETE
    def destroy(self, request, *args, **kwargs):                
        obj = Company.objects.get(id=self.kwargs['pk'])        
        self.check_object_permissions(self.request, obj)
        self.perform_destroy(obj)
        obj_json = {"name":obj.name}
        
        return Response(obj_json, status=status.HTTP_200_OK)





