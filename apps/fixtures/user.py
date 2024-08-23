# Imports
import pytest
from apps.user.models import User



# Data
data_user = {
    "email":"test@email.com",
    "first_name":"Peter",
    "last_name":"Pan",
    "password":"12345678"
}



# Fixture to use the user to test other models
@pytest.fixture
def user(db) -> User:
    return User.objects.create_user(**data_user)


