from app.exceptions.article_exceptions import (
    ArticleAlreadyExistsError,
    ArticleNotFoundError,
    ArticlePermissionDeniedError, EmptyArticleUpdateError,
)
from app.models.article import Article
from app.repositories.article_repository import ArticleRepository


class ArticleService:

    @staticmethod
    def get_all():
        return ArticleRepository.get_all()

    @staticmethod
    def get_by_slug(slug: str):
        article = ArticleRepository.get_by_slug(slug)

        if article is None:
            raise ArticleNotFoundError(
                "Article not found."
            )

        return article

    @staticmethod
    def create(data: dict, user_id: int):
        if ArticleRepository.get_by_slug(data["slug"]):
            raise ArticleAlreadyExistsError(
                "An article with this slug already exists."
            )

        read_time = ArticleService.calculate_read_time(
            data["content"]
        )

        article = Article(
            title=data["title"],
            slug=data["slug"],
            content=data["content"],
            topic=data["topic"],
            image_url=data.get("image_url"),
            read_time=read_time,
            author_id=user_id,
        )

        return ArticleRepository.create(article)

    @staticmethod
    def get_owned_article(
            article_id: int,
            user_id: int,
    ):
        article = ArticleRepository.get_by_id(article_id)

        if article is None:
            raise ArticleNotFoundError(
                "Article not found."
            )

        if article.author_id != user_id:
            raise ArticlePermissionDeniedError(
                "You are not allowed to modify this article."
            )

        return article

    @staticmethod
    def patch(
            article_id: int,
            user_id: int,
            data: dict,
    ):
        article = ArticleService.get_owned_article(
            article_id,
            user_id,
        )

        if not data:
            raise EmptyArticleUpdateError(
                "At least one field must be provided."
            )

        if "slug" in data:
            if (
                    article.slug != data["slug"]
                    and ArticleRepository.get_by_slug(data["slug"])
            ):
                raise ArticleAlreadyExistsError(
                    "An article with this slug already exists."
                )

            article.slug = data["slug"]

        if "title" in data:
            article.title = data["title"]

        if "content" in data:
            article.content = data["content"]

            article.read_time = ArticleService.calculate_read_time(
                data["content"]
            )

        if "topic" in data:
            article.topic = data["topic"]

        if "image_url" in data:
            article.image_url = data["image_url"]

        return ArticleRepository.patch(article)

    @staticmethod
    def delete(
            article_id: int,
            user_id: int,
    ):
        article = ArticleService.get_owned_article(
            article_id,
            user_id,
        )

        ArticleRepository.delete(article)

    @staticmethod
    def calculate_read_time(content: str) -> int:
        words = len(content.split())
        read_time = words / 200

        return max(1, round(read_time))
