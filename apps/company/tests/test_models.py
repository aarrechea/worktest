# Imports
import pytest
from apps.company.models import Company
from apps.fixtures.user import user



# Data
company_data = {
    "name":"Name of the company"
}


# Company test
@pytest.mark.django_db
def test_create_company(user):
    company = Company.objects.create(**company_data, user=user)
    
    assert company.name == company_data['name']
    assert company.evaluations_made == 0
    assert company.user == user
    


    


