from marshmallow import Schema, fields


class TopicSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    created_at = fields.DateTime()
