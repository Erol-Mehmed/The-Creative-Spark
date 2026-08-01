from marshmallow import Schema, fields


class UserResponseSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Email()

    first_name = fields.Str(allow_none=True)
    last_name = fields.Str(allow_none=True)
    bio = fields.Str(allow_none=True)
    avatar_url = fields.Str(allow_none=True)

    role = fields.Str()

    created_at = fields.DateTime()
    updated_at = fields.DateTime()
