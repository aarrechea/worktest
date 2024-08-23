# Imports
from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.abstract.viewsets import AbstractViewSet
from apps.auth.permissions import UserPermissions
from apps.company.models import Company
from apps.company.serializers import CompanySerializer
from apps.evaluation.serializers import EvaluationSerializer
from apps.evaluation.models import Evaluation



# Company viewset
class EvaluationViewSet(AbstractViewSet):
    http_method_names = ['get', 'post', 'put', 'delete', 'patch']
    permission_classes = (UserPermissions, )
    serializer_class = EvaluationSerializer  


    # GET all
    def get_queryset(self):                        
        queryset = Evaluation.objects.all()
                
        return queryset
        
    
    # GET object
    def get_object(self):        
        obj = Evaluation.objects.get(id=self.kwargs['pk'])
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
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
                        
    # DELETE
    def destroy(self, request, *args, **kwargs):        
        obj = Evaluation.objects.get(id=self.kwargs['pk'])                
        self.check_object_permissions(self.request, obj)        
        self.perform_destroy(obj)
        obj_json = {"object":self.serializer_class(obj).data}
        
        return Response(obj_json, status=status.HTTP_200_OK)
    
    
    # Patch method
    def update(self, request, *args, **kwargs):        
        data_to_serialize = {'score':request.data['score']}
        
        instance = self.get_object()        
        serializer = EvaluationSerializer(instance, data=data_to_serialize, partial=True)
        serializer.is_valid(raise_exception=True)
        
        company = Company.objects.get(id=request.data['company'])
        company.evaluations_made += 1                        
                
        try:
            with transaction.atomic():
                serializer.save(**serializer.validated_data)
                company.save()                
                return Response(serializer.validated_data)
            
        except Exception as e:
            return Response({'Error updating':str(e)})



