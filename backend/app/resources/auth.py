from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from marshmallow import ValidationError

from app.exceptions.auth_exceptions import (
    AuthenticationError,
    UserAlreadyExistsError,
)
from app.schemas.auth_schema import LoginSchema, RegisterSchema
from app.schemas.user_schema import UserResponseSchema, UserPatchSchema
from app.services.auth_service import AuthService
from app.services.user_service import UserService


class RegisterResource(Resource):

    def post(self):
        try:
            data = RegisterSchema().load(request.get_json())

            user = AuthService.register(data)

            return UserResponseSchema().dump(user), 201

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
                "token_type": "Bearer",
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

            return UserResponseSchema().dump(user), 200

        except AuthenticationError as error:
            return {
                "message": str(error),
            }, 401

    @jwt_required()
    def patch(self):
        try:
            data = UserPatchSchema().load(request.get_json())

            user = UserService.update(
                int(get_jwt_identity()),
                data,
            )

            return UserResponseSchema().dump(user), 200

        except ValidationError as error:
            return {
                "message": "Validation failed.",
                "errors": error.messages,
            }, 400

        except AuthenticationError as error:
            return {
                "message": str(error),
            }, 401
