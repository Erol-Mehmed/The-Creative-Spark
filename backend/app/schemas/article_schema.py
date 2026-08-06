from marshmallow import Schema, fields, validate


class ArticleCreateSchema(Schema):
    title = fields.Str(
        required=True,
        validate=validate.Length(min=5, max=150),
    )

    slug = fields.Str(
        required=True,
        validate=validate.Length(min=5, max=150),
    )

    content = fields.Str(
        required=True,
        validate=validate.Length(min=20),
    )

    topic = fields.Str(
        required=True,
        validate=validate.Length(min=2, max=100),
    )

    image_url = fields.Str(
        allow_none=True,
    )


class ArticlePatchSchema(Schema):
    title = fields.Str(required=False)
    slug = fields.Str(required=False)
    content = fields.Str(required=False)
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
