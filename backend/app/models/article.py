from datetime import UTC, datetime

from app.extensions import db


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
        nullable=False,
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

    def __repr__(self):
        return f"<Article {self.title}>"
