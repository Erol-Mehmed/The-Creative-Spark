from marshmallow import ValidationError
import re


class NotOnlyWhitespace:
    """Validator that fails if the string is empty or consists only of whitespace."""

    def __call__(self, value):
        if value is None:
            return
        if isinstance(value, str) and value.strip() == "":
            raise ValidationError("Field cannot be only whitespace.")


class SlugFormat:
    """Validator that enforces a simple slug format: lowercase letters, numbers, hyphens."""

    pattern = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

    def __call__(self, value):
        if value is None:
            return
        if not isinstance(value, str) or not self.pattern.match(value):
            raise ValidationError("Invalid slug format. Use lowercase letters, numbers and hyphens only.")
