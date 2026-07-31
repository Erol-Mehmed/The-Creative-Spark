from flask_jwt_extended import create_access_token

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.utils.security import check_password, hash_password


class AuthService:

    @staticmethod
    def register(data: dict) -> User:
        if UserRepository.get_by_email(data["email"]):
            raise ValueError("Email is already registered.")

        if UserRepository.get_by_username(data["username"]):
            raise ValueError("Username is already taken.")

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
            raise ValueError("Invalid email or password.")

        if not check_password(data["password"], user.password_hash):
            raise ValueError("Invalid email or password.")

        return create_access_token(identity=str(user.id))
