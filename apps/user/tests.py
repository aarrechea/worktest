# Imports
import pytest
from apps.user.models import User


# Data to test
data_user = {
    "email":"test@email.com",
    "first_name":"Peter",
    "last_name":"Pan",
    "password":"12345678"
}

data_superuser = {
    "email":"testsuper@email.com",
    "first_name":"Super",
    "last_name":"User",
    "password":"12345678"
}



# Tests
@pytest.mark.django_db # for django to give access to the database
def test_create_user():
    user = User.objects.create_user(**data_user)
    
    assert user.email == data_user['email']
    assert user.first_name == data_user['first_name']
    assert user.last_name == data_user['last_name']
    
    
@pytest.mark.django_db
def test_create_superuser():
    user = User.objects.create_superuser(**data_user)
    
    assert user.email == data_user['email']
    assert user.first_name == data_user['first_name']
    assert user.last_name == data_user['last_name']
    assert user.is_superuser == True
    assert user.is_staff == True





