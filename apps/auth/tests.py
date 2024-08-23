# Improts
import pytest
from rest_framework import status
from apps.fixtures.user import user



# Authentication test
class TestAuthenticationViewSet:
    endpoint = "/api/auth/"
    
    
    def test_login(self, client, user):        
        data = {
            "email":user.email,
            "password":"12345678"
        }
        
        response = client.post(self.endpoint + "login/", data)
        
        assert response.status_code == status.HTTP_200_OK
        
    



