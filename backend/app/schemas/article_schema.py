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

    image_url = fields.Str(
        allow_none=True,
    )


class AuthorSchema(Schema):
    id = fields.Int()

    username = fields.Str()

    first_name = fields.Str(
        allow_none=True,
    )

    last_name = fields.Str(
        allow_none=True,
    )

    avatar_url = fields.Str(
        allow_none=True,
    )


class ArticleResponseSchema(Schema):
    id = fields.Int()

    title = fields.Str()

    slug = fields.Str()

    content = fields.Str()

    image_url = fields.Str(
        allow_none=True,
    )

    created_at = fields.DateTime()

    updated_at = fields.DateTime()

    author = fields.Nested(
        AuthorSchema,
    )
