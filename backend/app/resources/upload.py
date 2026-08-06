from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from app.services.upload_service import UploadService


class ArticleImageUploadResource(Resource):

    @jwt_required()
    def post(self):
        image = request.files.get("image")

        if image is None:
            return {
                "message": "Image is required."
            }, 400

        image_url = UploadService.upload_image(
            image,
            UploadService.ARTICLE_FOLDER,
        )

        return {
            "image_url": image_url
        }, 201


class UserImageUploadResource(Resource):

    @jwt_required()
    def post(self):
        image = request.files.get("image")

        if image is None:
            return {
                "message": "Image is required."
            }, 400

        image_url = UploadService.upload_image(
            image,
            UploadService.USER_FOLDER,
        )

        return {
            "image_url": image_url
        }, 201
