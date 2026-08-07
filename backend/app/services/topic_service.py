from app.repositories.topic_repository import TopicRepository
from app.models.topic import Topic


class TopicService:

    @staticmethod
    def get_all():
        return TopicRepository.get_all()

    @staticmethod
    def get_or_create(name: str):
        return TopicRepository.get_or_create(name)

    @staticmethod
    def get_by_id(topic_id: int):
        return TopicRepository.get_by_id(topic_id)

    @staticmethod
    def get_by_name(name: str):
        return TopicRepository.get_by_name(name)
