from marshmallow import Schema, fields, validate
from app.validators import NotOnlyWhitespace, SlugFormat


class ArticleCreateSchema(Schema):
    title = fields.Str(
        required=True,
        validate=[validate.Length(min=5, max=150), NotOnlyWhitespace()],
    )

    slug = fields.Str(
        required=True,
        validate=[validate.Length(min=5, max=150), SlugFormat()],
    )

    content = fields.Str(
        required=True,
        validate=[validate.Length(min=20), NotOnlyWhitespace()],
    )

    topic = fields.Str(
        required=True,
        validate=validate.Length(min=2, max=100),
    )

    image_url = fields.Str(
        allow_none=True,
    )


class ArticlePatchSchema(Schema):
    title = fields.Str(required=False, validate=NotOnlyWhitespace())
    slug = fields.Str(required=False, validate=SlugFormat())
    content = fields.Str(required=False, validate=NotOnlyWhitespace())
    topic = fields.Str(
        required=False,
        validate=validate.Length(min=2, max=100),
    )
    image_url = fields.Str(required=False, allow_none=True)


class AuthorSchema(Schema):
    id = fields.Int()

    username = fields.Str()

    first_name = fields.Str(
        allow_none=True,
    )

    last_name = fields.Str(
        allow_none=True,
    )

    image = fields.Str(
        attribute="image_url",
        allow_none=True,
    )


class ArticleResponseSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    content = fields.Str()
    topic = fields.Str()

    image = fields.Str(
        attribute="image_url",
        allow_none=True,
    )

    claps = fields.Int()

    readTime = fields.Int(
        attribute="read_time",
    )

    createdAt = fields.DateTime(
        attribute="created_at",
    )

    author = fields.Nested(
        AuthorSchema
    )
