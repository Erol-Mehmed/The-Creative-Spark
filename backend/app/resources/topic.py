from flask_restful import Resource

from app.schemas.topic_schema import TopicSchema
from app.services.topic_service import TopicService


class TopicListResource(Resource):

    def get(self):
        """Get all topics sorted alphabetically"""
        topics = TopicService.get_all()
        
        return (
            TopicSchema(many=True).dump(topics),
            200,
        )
