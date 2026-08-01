from flask import request
from flask_restful import Resource
from marshmallow import ValidationError

from app.exceptions.auth_exceptions import (
    AuthenticationError,
    UserAlreadyExistsError,
)
from app.schemas.auth_schema import LoginSchema, RegisterSchema
from app.services.auth_service import AuthService
from flask_jwt_extended import get_jwt_identity, jwt_required


class RegisterResource(Resource):
    def post(self):
        try:
            data = RegisterSchema().load(request.get_json())

            user = AuthService.register(data)

            return {
                "message": "User registered successfully.",
                "id": user.id,
            }, 201

        except ValidationError as error:
            return {
                "message": "Validation failed.",
                "errors": error.messages,
            }, 400

        except UserAlreadyExistsError as error:
            return {
                "message": str(error),
            }, 409


class LoginResource(Resource):
    def post(self):
        try:
            data = LoginSchema().load(request.get_json())

            token = AuthService.login(data)

            return {
                "access_token": token,
            }, 200

        except ValidationError as error:
            return {
                "message": "Validation failed.",
                "errors": error.messages,
            }, 400

        except AuthenticationError as error:
            return {
                "message": str(error),
            }, 401


class MeResource(Resource):

    @jwt_required()
    def get(self):
        try:
            user = AuthService.me(int(get_jwt_identity()))

            return {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "bio": user.bio,
                "avatar_url": user.avatar_url,
                "role": user.role,
            }, 200

        except AuthenticationError as error:
            return {
                "message": str(error),
            }, 401
