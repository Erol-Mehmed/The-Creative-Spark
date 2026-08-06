from marshmallow import Schema, fields, validate


class UserResponseSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Email()

    first_name = fields.Str(allow_none=True)
    last_name = fields.Str(allow_none=True)
    bio = fields.Str(allow_none=True)
    image_url = fields.Str(allow_none=True)

    # Also expose `image` for frontend consistency (maps to image_url)
    image = fields.Str(attribute="image_url", allow_none=True)

    role = fields.Str()

    created_at = fields.DateTime()
    updated_at = fields.DateTime()


class UserPatchSchema(Schema):
    first_name = fields.Str(required=False, validate=validate.Length(max=50))
    last_name = fields.Str(required=False, validate=validate.Length(max=50))
    bio = fields.Str(required=False, validate=validate.Length(max=1000))
    image_url = fields.Str(required=False, allow_none=True)
