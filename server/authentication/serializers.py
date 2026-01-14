from rest_framework import serializers
from django.utils.timezone import now
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .constants import PROJECT_MODULES


class AuthenticationSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        super().validate(attrs)
        user = self.user

        if not user.is_superuser and not user.groups.exists():
            raise serializers.ValidationError(
                {
                    "detail": "Usuário não possui perfil de acesso. Entre em contato com o administrador."
                }
            )
            
        groups = user.groups.all().order_by("id")
        profile_current_id = groups.first().id if groups.exists() else None
        profile_current = groups.first().name if groups.exists() else None

        refresh = RefreshToken.for_user(user)
        refresh["profile_selected_id"] = profile_current_id
        refresh["profile_selected"] = profile_current
        access_token = refresh.access_token

        expires_in = now() + access_token.lifetime

        return {
            "token": str(access_token),
            "tokenExpiresIn": expires_in.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "userData": self.get_user_data(user, profile_current_id, profile_current),
        }

    def get_user_data(self, user, profile_current_id, profile_current):
        return {
            "authenticated": True,
            "email": user.email,
            "name": user.get_full_name() or user.username,
            "is_superuser": user.is_superuser,
            "profile_current_id": profile_current_id,
            "profile_current": profile_current,
            "profiles": self.get_profiles(user),
            "permissions": self.get_permissions(user),
        }

    def get_profiles(self, user):
        return [
            {
                "profile_id": group.id,
                "profile": group.name,
            }
            for group in user.groups.all().order_by("id")
        ]

    def get_permissions(self, user):
        perms = user.get_all_permissions()

        modulos = {
            app: {
                "url": PROJECT_MODULES[app], 
                "view": False,
                "add": False,
                "change": False,
                "delete": False,
            }
            for app in PROJECT_MODULES.keys()
        }

        for perm in perms:
            app_label, codename = perm.split(".")

            if app_label not in PROJECT_MODULES:
                continue

            if codename.startswith("view_"):
                modulos[app_label]["view"] = True
            elif codename.startswith("add_"):
                modulos[app_label]["add"] = True
            elif codename.startswith("change_"):
                modulos[app_label]["change"] = True
            elif codename.startswith("delete_"):
                modulos[app_label]["delete"] = True

        return list(modulos.values())
