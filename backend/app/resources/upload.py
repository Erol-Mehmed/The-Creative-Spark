from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from app.services.upload_service import UploadService
from app.exceptions.upload_exceptions import (
    InvalidImageError,
    ImageTooLargeError,
)


class ArticleImageUploadResource(Resource):

    @jwt_required()
    def post(self):
        image = request.files.get("image")

        try:
            image_url = UploadService.upload_image(
                image,
                UploadService.ARTICLE_FOLDER,
            )

            return {
                "image_url": image_url
            }, 201

        except InvalidImageError as error:
            return {"message": str(error)}, 400

        except ImageTooLargeError as error:
            # 413 Payload Too Large
            return {"message": str(error)}, 413

        except Exception as error:
            return {"message": "Failed to upload image."}, 500


class UserImageUploadResource(Resource):

    @jwt_required()
    def post(self):
        image = request.files.get("image")

        try:
            image_url = UploadService.upload_image(
                image,
                UploadService.USER_FOLDER,
            )

            return {
                "image_url": image_url
            }, 201

        except InvalidImageError as error:
            return {"message": str(error)}, 400

        except ImageTooLargeError as error:
            return {"message": str(error)}, 413

        except Exception:
            return {"message": "Failed to upload image."}, 500
