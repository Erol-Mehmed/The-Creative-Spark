from flask_jwt_extended import create_access_token

from app.exceptions.auth_exceptions import AuthenticationError, UserAlreadyExistsError
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.utils.security import check_password, hash_password


class AuthService:

    @staticmethod
    def register(data: dict) -> User:
        if UserRepository.get_by_email(data["email"]):
            raise UserAlreadyExistsError(
                "Email is already registered."
            )

        if UserRepository.get_by_username(data["username"]):
            raise UserAlreadyExistsError(
                "Username is already taken."
            )

        user = User(
            username=data["username"],
            email=data["email"],
            password_hash=hash_password(data["password"]),
        )

        return UserRepository.create(user)

    @staticmethod
    def login(data: dict) -> str:
        user = UserRepository.get_by_email(data["email"])

        if user is None:
            raise AuthenticationError(
                "Invalid email or password."
            )

        if not check_password(
                data["password"],
                user.password_hash,
        ):
            raise AuthenticationError(
                "Invalid email or password."
            )

        return create_access_token(
            identity=str(user.id)
        )

    @staticmethod
    def me(user_id: int) -> User:
        user = UserRepository.get_by_id(user_id)

        if user is None:
            raise AuthenticationError(
                "User not found."
            )

        return user
