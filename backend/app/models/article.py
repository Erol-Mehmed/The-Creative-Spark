from datetime import UTC, datetime

from app.extensions import db

# Association table for Article-Topic many-to-many relationship
article_topic = db.Table(
    'article_topic',
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id', ondelete='CASCADE'), primary_key=True),
    db.Column('topic_id', db.Integer, db.ForeignKey('topics.id', ondelete='CASCADE'), primary_key=True),
)


class Article(db.Model):
    __tablename__ = "articles"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    title = db.Column(
        db.String(150),
        nullable=False,
    )

    slug = db.Column(
        db.String(150),
        nullable=False,
        unique=True,
    )

    content = db.Column(
        db.Text,
        nullable=False,
    )

    topic = db.Column(
        db.String(100),
        nullable=True,  # Made nullable as we're moving to topics table
    )

    claps = db.Column(
        db.Integer,
        default=0,
    )

    image_url = db.Column(
        db.String(255),
        nullable=True,
    )

    read_time = db.Column(
        db.Integer,
        default=0,
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
    )

    author_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )

    author = db.relationship(
        "User",
        back_populates="articles",
    )

    # Many-to-many relationship with topics
    topics = db.relationship(
        "Topic",
        secondary=article_topic,
        backref="articles",
    )

    def __repr__(self):
        return f"<Article {self.title}>"
