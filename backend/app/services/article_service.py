from app.exceptions.article_exceptions import ArticleAlreadyExistsError
from app.models.article import Article
from app.repositories.article_repository import ArticleRepository


class ArticleService:

    @staticmethod
    def get_all():
        return ArticleRepository.get_all()

    @staticmethod
    def get_by_slug(slug: str):
        return ArticleRepository.get_by_slug(slug)

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
