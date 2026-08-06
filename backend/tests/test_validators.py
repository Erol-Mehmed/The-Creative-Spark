from app.validators import NotOnlyWhitespace, SlugFormat
from marshmallow import ValidationError


def test_not_only_whitespace_validator_rejects_spaces():
    validator = NotOnlyWhitespace()

    try:
        validator('   ')
        assert False, 'Expected ValidationError'
    except ValidationError as e:
        assert 'whitespace' in str(e).lower()


def test_slug_format_validator_accepts_valid_slug():
    validator = SlugFormat()
    # should not raise
    validator('valid-slug-123')


def test_slug_format_validator_rejects_invalid():
    validator = SlugFormat()
    try:
        validator('Invalid Slug!')
        assert False, 'Expected ValidationError'
    except ValidationError:
        pass
