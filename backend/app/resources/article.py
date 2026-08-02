from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from marshmallow import ValidationError

from app.exceptions.article_exceptions import ArticleAlreadyExistsError
from app.schemas.article_schema import (
    ArticleCreateSchema,
    ArticleResponseSchema,
)
from app.services.article_service import ArticleService


class ArticleListResource(Resource):

    def get(self):
        articles = ArticleService.get_all()

        return (
            ArticleResponseSchema(
                many=True,
            ).dump(articles),
            200,
        )

    @jwt_required()
    def post(self):
        try:
            data = ArticleCreateSchema().load(
                request.get_json()
            )

            article = ArticleService.create(
                data,
                int(get_jwt_identity()),
            )

            return (
                ArticleResponseSchema().dump(article),
                201,
            )

        except ValidationError as error:
            return {
                "message": "Validation failed.",
                "errors": error.messages,
            }, 400

        except ArticleAlreadyExistsError as error:
            return {
                "message": str(error),
            }, 409


class ArticleDetailResource(Resource):

    def get(self, slug):
        article = ArticleService.get_by_slug(slug)

        if article is None:
            return {
                "message": "Article not found.",
            }, 404

        return (
            ArticleResponseSchema().dump(article),
            200,
        )
