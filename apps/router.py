# Imports
from rest_framework import routers
from apps.user.viewsets import UserViewSet
from apps.auth.viewsets.register import RegisterViewSet
from apps.auth.viewsets.login import LoginViewSet
from apps.auth.viewsets.refresh import RefreshViewSet
from apps.company.viewsets import CompanyViewSet
from apps.evaluation.viewsets import EvaluationViewSet



# Router definition
router = routers.SimpleRouter()



# Authentication
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')



# User
router.register(r'user', UserViewSet, basename='user')


# Comopany
router.register(r'company', CompanyViewSet, basename='company')


# Evaluation
router.register(r'evaluation', EvaluationViewSet, basename='evaluation')



# Url patterns
urlpatterns = [
    *router.urls
]


