import cloudinary
import cloudinary.uploader

from app.config import Config


class UploadService:

    @staticmethod
    def upload_image(file):
        cloudinary.config(
            cloud_name=Config.CLOUDINARY_CLOUD_NAME,
            api_key=Config.CLOUDINARY_API_KEY,
            api_secret=Config.CLOUDINARY_API_SECRET,
        )

        result = cloudinary.uploader.upload(
            file,
            folder="creative-spark/articles",
        )

        return result["secure_url"]
