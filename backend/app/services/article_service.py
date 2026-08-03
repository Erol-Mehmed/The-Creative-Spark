from app.exceptions.article_exceptions import (
    ArticleAlreadyExistsError,
    ArticleNotFoundError,
    ArticlePermissionDeniedError,
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

        article = Article(
            title=data["title"],
            slug=data["slug"],
            content=data["content"],
            image_url=data.get("image_url"),
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
    def update(
            article_id: int,
            user_id: int,
            data: dict,
    ):
        article = ArticleService.get_owned_article(
            article_id,
            user_id,
        )

        if (
                article.slug != data["slug"]
                and ArticleRepository.get_by_slug(data["slug"])
        ):
            raise ArticleAlreadyExistsError(
                "An article with this slug already exists."
            )

        article.title = data["title"]
        article.slug = data["slug"]
        article.content = data["content"]
        article.image_url = data.get("image_url")

        return ArticleRepository.update(article)

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
