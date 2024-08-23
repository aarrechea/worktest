# Imports
import pytest
from rest_framework.test import APIClient



# Fixture
@pytest.fixture
def client():
    return APIClient()




