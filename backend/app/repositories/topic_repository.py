from sqlalchemy import select

from app.extensions import db
from app.models.topic import Topic


class TopicRepository:

    @staticmethod
    def get_all() -> list[Topic]:
        statement = select(Topic).order_by(Topic.name)
        return db.session.execute(statement).scalars().all()

    @staticmethod
    def get_by_id(topic_id: int) -> Topic | None:
        return db.session.get(Topic, topic_id)

    @staticmethod
    def get_by_name(name: str) -> Topic | None:
        statement = select(Topic).where(Topic.name.ilike(name))
        return db.session.execute(statement).scalar_one_or_none()

    @staticmethod
    def create(topic: Topic) -> Topic:
        db.session.add(topic)
        db.session.commit()
        return topic

    @staticmethod
    def get_or_create(name: str) -> Topic:
        """Get topic by name or create if doesn't exist"""
        topic = TopicRepository.get_by_name(name)
        if not topic:
            topic = Topic(name=name.strip().lower())
            TopicRepository.create(topic)
        return topic
