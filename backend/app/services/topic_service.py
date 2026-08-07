from app.repositories.topic_repository import TopicRepository
from app.models.topic import Topic
from app.exceptions.article_exceptions import InvalidArticleTopicError


class TopicService:
    DEFAULT_TOPIC_NAMES = [
        "Life",
        "Work",
        "Science",
        "Technology",
        "Media",
        "Society",
        "Culture",
        "Nature",
        "Sport",
        "World",
    ]

    @staticmethod
    def get_all():
        TopicService.ensure_default_topics()
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

    @staticmethod
    def ensure_default_topics() -> None:
        for topic_name in TopicService.DEFAULT_TOPIC_NAMES:
            if TopicRepository.get_by_name(topic_name) is None:
                TopicRepository.create(Topic(name=topic_name))

    @staticmethod
    def resolve_existing(topic_names: list[str]) -> list[Topic]:
        TopicService.ensure_default_topics()
        topics: list[Topic] = []
        for topic_name in topic_names:
            normalized_name = topic_name.strip()
            if not normalized_name:
                continue

            topic = TopicRepository.get_by_name(normalized_name)
            if topic is None:
                raise InvalidArticleTopicError(
                    f"Invalid topic: {normalized_name}."
                )

            topics.append(topic)

        unique_topics: dict[int, Topic] = {}
        for topic in topics:
            unique_topics[topic.id] = topic
        return list(unique_topics.values())
