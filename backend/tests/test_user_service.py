import pytest
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.models.user import User


def test_user_service_update_fields(db):
    # create a user
    user = User(username='u1', email='u1@example.com', password_hash='h')
    UserRepository.create(user)

    updated = UserService.update(user.id, {
        'first_name': 'John',
        'last_name': 'Doe',
        'bio': 'hello',
        'image_url': 'http://example.com/i.jpg'
    })

    assert updated.first_name == 'John'
    assert updated.last_name == 'Doe'
    assert updated.bio == 'hello'
    assert updated.image_url == 'http://example.com/i.jpg'
