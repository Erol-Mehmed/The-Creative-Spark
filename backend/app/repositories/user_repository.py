from sqlalchemy import select

from app.extensions import db
from app.models.user import User


class UserRepository:

    @staticmethod
    def get_by_id(user_id: int) -> User | None:
        return db.session.get(User, user_id)

    @staticmethod
    def get_by_email(email: str) -> User | None:
        statement = select(User).where(User.email == email)

        return db.session.execute(statement).scalar_one_or_none()

    @staticmethod
    def get_by_username(username: str) -> User | None:
        statement = select(User).where(User.username == username)

        return db.session.execute(statement).scalar_one_or_none()

    @staticmethod
    def create(user: User) -> User:
        db.session.add(user)
        db.session.commit()

        return user
