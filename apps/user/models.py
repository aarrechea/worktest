# Imports
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from apps.abstract.models import AbstractModel


# User manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if email is None:
            raise TypeError('You must enter an email')
        
        if password is None:
            raise TypeError('You must enter a password')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    
    def create_superuser(self, email, password, **kwargs):
        if email is None:
            raise TypeError('You must enter an email')
        
        if password is None:
            raise TypeError('You must enter a password')
        
        user = self.create_user(email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True        
        user.save(using=self._db)
        
        return user



# User model
class User(AbstractModel, AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    
    def __str__(self):
        return f"Username: {self.email}"
    
    
    # To be accessed anywhere on a User object
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"





