from app.repositories.user_repository import UserRepository
from app.exceptions.auth_exceptions import AuthenticationError
from app.models.user import User


class UserService:

    @staticmethod
    def update(user_id: int, data: dict) -> User:
        user = UserRepository.get_by_id(user_id)

        if user is None:
            raise AuthenticationError("User not found.")

        # Only allow updating specific fields
        for field in ("first_name", "last_name", "bio", "image_url"):
            if field in data:
                setattr(user, field, data[field])

        return UserRepository.update(user)
