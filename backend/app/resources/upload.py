from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from app.services.upload_service import UploadService


class ImageUploadResource(Resource):

    @jwt_required()
    def post(self):
        image = request.files.get("image")

        if not image:
            return {
                "message": "No image provided."
            }, 400

        url = UploadService.upload_image(image)

        return {
            "image_url": url
        }, 201
