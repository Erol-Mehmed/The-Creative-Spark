# The Creative Spark

The Creative Spark is a full-stack publishing platform where users can register, write articles, upload images, edit their profile, and browse content by topic.

## Tech Stack

- **Backend:** Flask, Flask-RESTful, SQLAlchemy, Marshmallow, Flask-JWT-Extended, Flask-Migrate
- **Frontend:** Angular 16, TypeScript, Bootstrap, ng-bootstrap
- **Database:** PostgreSQL
- **Media Storage:** Cloudinary

## Main Features

- JWT authentication (register, login, logout, current user)
- Profile editing (name, bio, avatar image upload)
- Article CRUD with owner-only edit/delete
- Topic-based article filtering
- Required topic selection when creating articles
- Predefined topic set:
  - `Life`, `Work`, `Science`, `Technology`, `Media`, `Society`, `Culture`, `Nature`, `Sport`, `World`
- Author pages with profile info and stories
- Responsive UI with auth-aware header/hero behavior

## Project Structure

```text
the-creative-spark/
├── backend/
│   ├── app/
│   │   ├── resources/      # API resources
│   │   ├── services/       # Business logic
│   │   ├── repositories/   # DB queries
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Marshmallow schemas
│   │   ├── exceptions/     # Custom exceptions
│   │   ├── routes.py       # API route registration
│   │   └── run.py          # App entrypoint
│   ├── migrations/
│   ├── tests/
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── core/
    │   ├── shared/
    │   └── styles.scss
    ├── angular.json
    └── package.json
```

## Backend Setup

### Prerequisites

- Python 3.9+
- PostgreSQL

### Steps

1. Create virtual environment and install dependencies:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

1. Create environment file:

```bash
cp .env.example .env
```

1. Fill `.env` values:

```env
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=...
DB_NAME=...
SECRET_KEY=...
JWT_SECRET_KEY=...
JWT_ACCESS_TOKEN_EXPIRES=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

1. Run migrations:

```bash
flask db upgrade
```

1. Start backend:

```bash
python app/run.py
```

Backend runs on `http://localhost:5001`.

## Frontend Setup

### Prerequisites

- Node.js 18+
- npm

### Steps

1. Install dependencies:

```bash
cd frontend
npm install
```

1. Start app:

```bash
npm start
```

Frontend runs on `http://localhost:4200`.

## API Overview

### Health

- `GET /api/health`

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT required)
- `PATCH /api/auth/me` (JWT required)

### Articles

- `GET /api/articles`
- `GET /api/articles?topic=<topic-name>`
- `GET /api/articles/<slug>`
- `POST /api/articles` (JWT required)
- `PATCH /api/articles/<slug>` (JWT required, owner only)
- `DELETE /api/articles/<slug>` (JWT required, owner only)
- `GET /api/author?username=<username>`

### Topics

- `GET /api/topics`

### Uploads

- `POST /api/uploads/articles` (JWT required, multipart `image`)
- `POST /api/uploads/users` (JWT required, multipart `image`)

## Article Payload Notes

Create article requires `topics` with at least one value from `/api/topics`.

Example:

```json
{
  "title": "My Article",
  "slug": "my-article",
  "content": "Long enough article content...",
  "topics": ["Technology"],
  "image_url": "https://..."
}
```

## Tests

Run backend tests:

```bash
cd backend
source .venv/bin/activate
pytest -q
```

## Build

Build frontend production bundle:

```bash
cd frontend
npm run build
```
