from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from marshmallow import ValidationError

from app.exceptions.article_exceptions import (
    ArticleAlreadyExistsError,
    ArticleNotFoundError,
    ArticlePermissionDeniedError
)
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
        try:
            article = ArticleService.get_by_slug(slug)

            return (
                ArticleResponseSchema().dump(article),
                200,
            )

        except ArticleNotFoundError as error:
            return {
                "message": str(error),
            }, 404


class ArticleManageResource(Resource):

    @jwt_required()
    def put(self, article_id):
        try:
            data = ArticleCreateSchema().load(
                request.get_json()
            )

            article = ArticleService.update(
                article_id,
                int(get_jwt_identity()),
                data,
            )

            return (
                ArticleResponseSchema().dump(article),
                200,
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

        except ArticleNotFoundError as error:
            return {
                "message": str(error),
            }, 404

        except ArticlePermissionDeniedError as error:
            return {
                "message": str(error),
            }, 403

    @jwt_required()
    def delete(self, article_id):
        try:
            ArticleService.delete(
                article_id,
                int(get_jwt_identity()),
            )

            return "", 204

        except ArticleNotFoundError as error:
            return {
                "message": str(error),
            }, 404

        except ArticlePermissionDeniedError as error:
            return {
                "message": str(error),
            }, 403
