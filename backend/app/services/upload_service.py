import cloudinary
import cloudinary.uploader

from app.config import Config
from app.exceptions.upload_exceptions import (
    InvalidImageError,
    ImageTooLargeError,
)


class UploadService:
    ARTICLE_FOLDER = "creative-spark/articles"
    USER_FOLDER = "creative-spark/users"

    # Max upload size in bytes (5 MB)
    MAX_SIZE = 5 * 1024 * 1024

    ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
    ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}

    cloudinary.config(
        cloud_name=Config.CLOUDINARY_CLOUD_NAME,
        api_key=Config.CLOUDINARY_API_KEY,
        api_secret=Config.CLOUDINARY_API_SECRET,
        secure=True,
    )

    @staticmethod
    def _allowed_extension(filename: str) -> bool:
        if "." not in filename:
            return False
        ext = filename.rsplit('.', 1)[1].lower()
        return ext in UploadService.ALLOWED_EXTENSIONS

    @staticmethod
    def upload_image(file, folder):
        if file is None:
            raise InvalidImageError("Image is required.")

        filename = getattr(file, "filename", None)
        if not filename or not UploadService._allowed_extension(filename):
            raise InvalidImageError("Invalid image type. Allowed: jpg, jpeg, png, webp.")

        # Validate mime type when available
        mimetype = getattr(file, "mimetype", None)
        if mimetype and mimetype not in UploadService.ALLOWED_MIME_TYPES:
            raise InvalidImageError("Invalid image mime type.")

        # Determine size safely
        try:
            stream = file.stream
            # Seek to end to get size then rewind
            current = stream.tell()
            stream.seek(0, 2)
            size = stream.tell()
            stream.seek(current)
        except Exception:
            # Fallback: try content_length attribute
            size = getattr(file, "content_length", None)

        if size is not None and size > UploadService.MAX_SIZE:
            raise ImageTooLargeError("Image exceeds maximum size of 5MB.")

        result = cloudinary.uploader.upload(
            file,
            folder=folder,
        )

        return result.get("secure_url")
