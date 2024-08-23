# Imports
import pytest
from rest_framework import status
from apps.fixtures.user import user
from apps.company.models import Company



class TestCompanyViewSets:
    endpoint = "/api/company/"
    
    # Get companies
    @pytest.mark.django_db
    def test_get_companies(self, client, user):        
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        
        assert response.status_code == status.HTTP_200_OK
    
    


