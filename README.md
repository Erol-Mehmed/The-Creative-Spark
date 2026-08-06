The Creative Spark - Backend (Flask REST)

Overview

This is the backend for The Creative Spark — a Flask-RESTful application providing user authentication, article management and image uploads (Cloudinary). It follows a layered architecture (resources, services, repositories, models, schemas) and uses Marshmallow for validation and SQLAlchemy for persistence.

Features

- Authentication (JWT) — register, login, get current user, update profile
- Article CRUD (create, read, update, delete)
- Image upload endpoints (Cloudinary) for articles and users
- Marshmallow schemas with custom validators (NotOnlyWhitespace, SlugFormat)
- Upload validation (type, mime, max size 5MB)
- Alembic migrations present
- Tests (pytest) and factories (factory_boy) included in backend/tests

Environment

Required environment variables (in .env):

- SECRET_KEY
- JWT_SECRET_KEY
- DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

Installation

1. Create a Python virtual environment and activate it.
2. Install backend dependencies:
   pip install -r backend/requirements.txt
3. Create a .env file with the environment variables above.
4. Initialize database and run migrations (example using Flask-Migrate):
   flask db upgrade
5. Run the app:
   python backend/app/run.py

Endpoints (summary)

Public:
- GET /api/health
- POST /api/auth/register
- POST /api/auth/login
- GET /api/articles
- GET /api/articles/<slug>

Protected (requires Bearer <token>):
- GET /api/auth/me
- PATCH /api/auth/me
- POST /api/articles
- PATCH /api/articles/<int:article_id>
- DELETE /api/articles/<int:article_id>
- POST /api/uploads/articles (multipart, field name: image)
- POST /api/uploads/users (multipart, field name: image)

Validation

- Schemas are implemented using Marshmallow. Two custom validators included: NotOnlyWhitespace, SlugFormat.
- Upload validation enforces allowed extensions (jpg/jpeg/png/webp), mime types and max size 5MB.

Testing

- Tests are under backend/tests using pytest. To run locally:
  pytest backend/tests

Common make targets (Makefile)

- install: create a virtualenv and install backend dependencies
    make install
- migrate: run alembic migrations (requires .env and DB access)
    make migrate
- run: start the Flask backend
    make run
- test: run pytest
    make test
- lint: run black check
    make lint

Notes

- Cloudinary is used for image hosting; ensure credentials in .env.
- Tokens are expected as Bearer tokens in Authorization header.

Future improvements

- Add more tests to increase coverage
- Add CI workflow
- Add more granular roles/permissions

