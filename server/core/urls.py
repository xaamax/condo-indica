from django.contrib import admin
from django.urls import path, include

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    path('api/v1/', include('authentication.urls')),
    path('api/v1/', include('condominium.urls')),
    path('api/v1/', include('categories.urls')),
    path('api/v1/', include('provider.urls')),
    path('api/v1/', include('ratings.urls')),
    path('api/v1/', include('dashboard.urls')),
    path('', admin.site.urls),
]
