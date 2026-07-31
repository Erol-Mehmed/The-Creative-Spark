from flask import request
from flask_restful import Resource

from app.schemas.auth_schema import LoginSchema, RegisterSchema
from app.services.auth_service import AuthService


class RegisterResource(Resource):

    def post(self):
        data = RegisterSchema().load(request.get_json())

        user = AuthService.register(data)

        return {
            "message": "User registered successfully.",
            "id": user.id,
        }, 201


class LoginResource(Resource):

    def post(self):
        data = LoginSchema().load(request.get_json())

        token = AuthService.login(data)

        return {
            "access_token": token,
        }, 200
