class InvalidImageError(Exception):
    """Raised when the uploaded image is missing or has invalid format."""


class ImageTooLargeError(Exception):
    """Raised when the uploaded image exceeds the allowed size."""
