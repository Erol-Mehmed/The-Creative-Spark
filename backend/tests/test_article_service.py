import pytest
from app.services.article_service import ArticleService
from app.repositories.article_repository import ArticleRepository
from app.models.article import Article
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.exceptions.article_exceptions import ArticleAlreadyExistsError


def test_calculate_read_time_short():
    assert ArticleService.calculate_read_time("short content") == 1


def test_calculate_read_time_long():
    content = "word " * 1000  # 1000 words -> 5 minutes
    assert ArticleService.calculate_read_time(content) == max(1, round(1000 / 200))


def test_create_duplicate_slug_raises(db):
    user = User(username='uA', email='a@example.com', password_hash='h')
    UserRepository.create(user)

    article = Article(
        title='t',
        slug='dup-slug',
        content='x' * 300,
        topic='t',
        author_id=user.id,
    )
    ArticleRepository.create(article)

    with pytest.raises(ArticleAlreadyExistsError):
        ArticleService.create({'title': 't2', 'slug': 'dup-slug', 'content': 'x' * 300, 'topic': 't'}, user.id)
