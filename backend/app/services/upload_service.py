import cloudinary
import cloudinary.uploader

from app.config import Config


class UploadService:
    ARTICLE_FOLDER = "creative-spark/articles"
    USER_FOLDER = "creative-spark/users"

    cloudinary.config(
        cloud_name=Config.CLOUDINARY_CLOUD_NAME,
        api_key=Config.CLOUDINARY_API_KEY,
        api_secret=Config.CLOUDINARY_API_SECRET,
        secure=True,
    )

    @staticmethod
    def upload_image(
            file,
            folder,
    ):
        result = cloudinary.uploader.upload(
            file,
            folder=folder,
        )

        return result["secure_url"]
