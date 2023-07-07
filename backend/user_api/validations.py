from rest_framework.exceptions import APIException
from rest_framework import status
from django.utils.encoding import force_str
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data["email"].strip()
    username = data["username"].strip()
    password = data["password"].strip()

    if not email or UserModel.objects.filter(email=email).exists():
        raise CustomValidationError("Escriba un email valido", 'error', status_code=status.HTTP_400_BAD_REQUEST)

    if not username :
        raise CustomValidationError("Escriba un usuario valido", 'error', status_code=status.HTTP_400_BAD_REQUEST)

    if not password or len(password) < 8:
        raise CustomValidationError("Escoja otra contraseña mas larga", 'error', status_code=status.HTTP_400_BAD_REQUEST)

    return data

def validate_email(data):
    email = data["email"].strip()
    if not email:
        raise CustomValidationError("Necesita un email", 'error', status_code=status.HTTP_400_BAD_REQUEST)
    return True

def validate_username(data):
    username = data["username"].strip()
    if not username:
        raise CustomValidationError("Necesita un usuario", 'error', status_code=status.HTTP_400_BAD_REQUEST)
    return True

def validate_password(data):
    password = data["password"].strip()
    if not password:
        raise CustomValidationError("Necesita una contraseña", 'error', status_code=status.HTTP_400_BAD_REQUEST)
    return True

class CustomValidationError(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = 'A server error occurred.'

    def __init__(self, detail, field, status_code):
        if status_code is not None:self.status_code = status_code
        if detail is not None:
            self.detail = {field: force_str(detail)}
        else: self.detail = {'detail': force_str(self.default_detail)}