class ArticleError(Exception):
    """Base class for article-related exceptions."""


class ArticleNotFoundError(ArticleError):
    pass


class ArticleAlreadyExistsError(ArticleError):
    pass


class ArticlePermissionDeniedError(ArticleError):
    pass
