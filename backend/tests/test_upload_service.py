import io
import pytest
from werkzeug.datastructures import FileStorage
from app.services.upload_service import UploadService
from app.exceptions.upload_exceptions import InvalidImageError, ImageTooLargeError


def make_file(filename='test.jpg', content=b'abc', mimetype='image/jpeg'):
    stream = io.BytesIO(content)
    return FileStorage(stream=stream, filename=filename, content_type=mimetype)


def test_upload_service_rejects_missing_file():
    with pytest.raises(InvalidImageError):
        UploadService.upload_image(None, UploadService.USER_FOLDER)


def test_upload_service_rejects_invalid_extension():
    f = make_file('test.txt', b'data', 'text/plain')
    with pytest.raises(InvalidImageError):
        UploadService.upload_image(f, UploadService.USER_FOLDER)


def test_upload_service_rejects_large_file():
    # create a large in-memory file (>5MB)
    content = b'a' * (UploadService.MAX_SIZE + 1)
    f = make_file('big.jpg', content, 'image/jpeg')

    with pytest.raises(ImageTooLargeError):
        UploadService.upload_image(f, UploadService.USER_FOLDER)
