from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "dev-only-not-secret"
DEBUG = True
ALLOWED_HOSTS = ["*",'127.0.0.1','localhost']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'amr_api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = "amr_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "amr_project.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- DRF / Auth ---
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# --- CORS/CSRF for Vite on 5173 ---
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# added by setup
CORS_ALLOWED_ORIGINS += ["http://localhost:5175"]

# added by setup
CORS_ALLOWED_ORIGINS += ["http://127.0.0.1:5175"]

CORS_ALLOW_CREDENTIALS = True
# === AMR CORS OVERRIDE (auto-appended) ===
try:
    from .local_settings import *  # noqa
except Exception:
    pass
# === END AMR CORS OVERRIDE ===

# === AUTO IMPORT LOCAL SETTINGS (AMR) ===
try:
    from .local_settings import *  # noqa
except Exception:
    pass
# === END AUTO IMPORT LOCAL SETTINGS (AMR) ===

# --- load local overrides (admin, cors, etc.) ---
try:
    from .local_settings import *
except Exception:
    pass

# === Upload limits ===
# ~10 MB in-memory parse; larger files will be streamed (tweak as needed)
DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024

# ================== PRODUCTION SETTINGS (Render / Neon) ==================
import os
import dj_database_url

# Allow Render host (update with your actual URL later)
ALLOWED_HOSTS = ["localhost", "127.0.0.1", ".onrender.com"]

# Use DATABASE_URL (from Neon) if set
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    DATABASES["default"] = dj_database_url.parse(
        DATABASE_URL,
        conn_max_age=600,
        ssl_require=True,
    )

# Static files for Render
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Whitenoise for serving static files
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Static files for Render (final config)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Whitenoise for serving static files
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Static files for Render (final config)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Whitenoise for serving static files
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Static files for Render (final config)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Whitenoise for serving static files
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ---- DB connection tweaks for Neon on Render ----
import os as _os_for_db_tweak

DATABASE_URL = _os_for_db_tweak.getenv("DATABASE_URL")
if DATABASE_URL:
    db_from_env = dj_database_url.parse(
        DATABASE_URL,
        conn_max_age=0,        # close connection each request
        ssl_require=True,
    )
    DATABASES["default"].update(db_from_env)
    DATABASES["default"]["CONN_HEALTH_CHECKS"] = True

# ---- Use DJANGO_DEBUG env var (Render) ----
DEBUG = _os_for_db_tweak.getenv("DJANGO_DEBUG", "False") == "True"
