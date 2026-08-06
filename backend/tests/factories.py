import factory
from factory.alchemy import SQLAlchemyModelFactory
from app.models.user import User
from app.models.article import Article
from app.extensions import db


class UserFactory(SQLAlchemyModelFactory):
    class Meta:
        model = User
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = 'flush'

    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.LazyAttribute(lambda o: f'{o.username}@example.com')
    password_hash = factory.LazyFunction(lambda: 'hashed-password')


class ArticleFactory(SQLAlchemyModelFactory):
    class Meta:
        model = Article
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = 'flush'

    title = factory.Sequence(lambda n: f'Article {n}')
    slug = factory.Sequence(lambda n: f'article-{n}')
    content = 'This is test content ' * 20
    topic = 'testing'
    author = factory.SubFactory(UserFactory)
