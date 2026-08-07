from app.extensions import db


class Topic(db.Model):
    __tablename__ = "topics"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    name = db.Column(
        db.String(100),
        nullable=False,
        unique=True,
    )

    created_at = db.Column(
        db.DateTime,
        default=db.func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<Topic {self.name}>"

