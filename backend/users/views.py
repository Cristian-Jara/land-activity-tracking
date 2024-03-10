from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from conf.settings import (
    AUTH_COOKIE,
    REFRESH_COOKIE,
    AUTH_COOKIE_ACCESS_MAX_AGE,
    AUTH_COOKIE_REFRESH_MAX_AGE,
    AUTH_COOKIE_SECURE,
    AUTH_COOKIE_HTTPONLY,
    AUTH_COOKIE_PATH,
    AUTH_COOKIE_SAMESITE,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            response.set_cookie(
                AUTH_COOKIE,
                access_token,
                max_age=AUTH_COOKIE_ACCESS_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTPONLY,
                samesite=AUTH_COOKIE_SAMESITE,
            )
            response.set_cookie(
                REFRESH_COOKIE,
                refresh_token,
                max_age=AUTH_COOKIE_REFRESH_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTPONLY,
                samesite=AUTH_COOKIE_SAMESITE,
            )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(REFRESH_COOKIE)
        if refresh_token:
            request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                AUTH_COOKIE,
                access_token,
                max_age=AUTH_COOKIE_ACCESS_MAX_AGE,
                path=AUTH_COOKIE_PATH,
                secure=AUTH_COOKIE_SECURE,
                httponly=AUTH_COOKIE_HTTPONLY,
                samesite=AUTH_COOKIE_SAMESITE,
            )

        return response


class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get(AUTH_COOKIE)
        if access_token:
            request.data['token'] = access_token
        if not request.data.get('token'):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie(AUTH_COOKIE)
        response.delete_cookie(REFRESH_COOKIE)

        return response
