import os
from .settings import *

# Production settings
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# Get allowed hosts from environment
allowed_hosts = os.environ.get('ALLOWED_HOSTS', '')
if allowed_hosts:
    ALLOWED_HOSTS = [host.strip() for host in allowed_hosts.split(',')]

# Get CORS origins from environment  
cors_origins = os.environ.get('CORS_ALLOWED_ORIGINS', '')
if cors_origins:
    CORS_ALLOWED_ORIGINS = [origin.strip() for origin in cors_origins.split(',')]
    CSRF_TRUSTED_ORIGINS = [origin.strip() for origin in cors_origins.split(',')]

# Database configuration for production
if 'DATABASE_URL' in os.environ:
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
    }

# Static files for production
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
