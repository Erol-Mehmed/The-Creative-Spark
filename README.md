# The Creative Spark

A full-stack article publishing platform with user authentication, image uploads, and article management.

**Technology Stack:**
- **Backend:** Flask, Flask-RESTful, SQLAlchemy, PostgreSQL
- **Frontend:** Angular, TypeScript
- **Image Storage:** Cloudinary
- **Authentication:** JWT (Flask-JWT-Extended)
- **Database Migrations:** Alembic (Flask-Migrate)

---

## Project Structure

```
the-creative-spark/
├── backend/
│   ├── app/
│   │   ├── resources/          # HTTP endpoints (thin layer)
│   │   ├── services/           # Business logic
│   │   ├── repositories/       # Database access layer
│   │   ├── models/             # SQLAlchemy ORM models
│   │   ├── schemas/            # Marshmallow validation & serialization
│   │   ├── exceptions/         # Custom exceptions
│   │   ├── validators.py       # Custom Marshmallow validators
│   │   ├── config.py           # App configuration
│   │   ├── extensions.py       # Flask extensions initialization
│   │   └── __init__.py         # App factory
│   ├── migrations/             # Alembic migrations
│   ├── tests/
│   │   ├── conftest.py         # Pytest fixtures
│   │   ├── factories.py        # Test data factories
│   │   └── test_*.py           # Test files
│   ├── .env.example            # Environment template
│   ├── .venv/                  # Virtual environment (git ignored)
│   └── requirements.txt        # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── core/
    │   │   ├── services/       # Application services (Auth, User, Upload)
    │   │   ├── core.module.ts  # Shared services and interceptors
    │   │   └── app-interceptors.ts  # HTTP interceptor for JWT & /api prefix
    │   ├── components/
    │   │   ├── header/         # Navigation header (guest/logged-in)
    │   │   ├── auth-modal/     # Login/Register modal
    │   │   ├── home/           # Article list
    │   │   ├── article/        # Article detail view
    │   │   ├── author/         # Author profile with edit toggle
    │   │   ├── profile-edit/   # Profile update form with image upload
    │   │   ├── article-editor/ # Article creation/edit with image upload
    │   │   └── ...
    │   ├── environments/
    │   ├── app.module.ts
    │   └── main.ts
    ├── angular.json
    ├── package.json
    └── tsconfig.json
```

---

## Backend Setup

### Prerequisites
- Python 3.9+
- PostgreSQL 12+
- Virtual environment manager (venv)

### Installation

1. **Create and activate virtual environment:**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Configure in `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/creative_spark
   JWT_SECRET_KEY=your-secret-key-min-32-chars
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Initialize database:**
   ```bash
   flask db upgrade
   ```

5. **Run backend:**
   ```bash
   python run.py
   ```
   Backend runs on `http://localhost:5001`

---

## Frontend Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:4200`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register new user
  ```json
  { "username": "string", "email": "string", "password": "string" }
  ```
- `POST /api/auth/login` — Login user
  ```json
  { "email": "string", "password": "string" }
  ```
  **Response:** `{ "access_token": "string" }`

- `GET /api/auth/me` — Get current user profile (protected)
  ```
  Authorization: Bearer <access_token>
  ```
  **Response:** User object with id, username, email, first_name, last_name, bio, image_url

- `PATCH /api/auth/me` — Update user profile (protected)
  ```json
  { "first_name": "string", "last_name": "string", "bio": "string", "image_url": "string" }
  ```

### Articles
- `GET /api/articles` — List all articles (with optional filters)
  - Query: `?has-articles=1` (returns only articles with images)
  - Query: `?section=most-liked-articles` (returns most liked articles)

- `GET /api/articles/<id>` — Get article by ID

- `POST /api/articles` — Create new article (protected)
  ```json
  { "title": "string", "slug": "string", "content": "string", "topic": "string", "image_url": "string" }
  ```

- `PATCH /api/articles/<id>` — Update article (protected, owner only)
  ```json
  { "title": "string", "slug": "string", "content": "string", "topic": "string", "image_url": "string" }
  ```

- `DELETE /api/articles/<id>` — Delete article (protected, owner only)

- `POST /api/articles/<id>/clap` — Clap on article (protected)

### Image Upload
- `POST /api/uploads/articles` — Upload article image (protected)
  - Form data: `image` (file, max 5MB, jpg/jpeg/png/webp)
  - **Response:** `{ "image_url": "https://..." }`

- `POST /api/uploads/users` — Upload user profile image (protected)
  - Form data: `image` (file, max 5MB, jpg/jpeg/png/webp)
  - **Response:** `{ "image_url": "https://..." }`

---

## Authentication Flow

1. User registers or logs in
2. Backend returns `access_token` (JWT)
3. Frontend stores token in `localStorage`
4. HTTP interceptor automatically attaches token to all requests: `Authorization: Bearer <token>`
5. Protected endpoints validate JWT before processing
6. Logout clears token and hides authenticated UI

---

## Testing

### Run all tests:
```bash
cd backend
source .venv/bin/activate
pytest backend/tests -v
```

### Run specific test:
```bash
pytest backend/tests/test_article_permission.py -v
```

### Test files:
- `test_validators.py` — Custom Marshmallow validators (NotOnlyWhitespace, SlugFormat)
- `test_upload_service.py` — Image validation (file type, size, mime type)
- `test_auth_integration.py` — Registration, login, JWT flow
- `test_auth_patch_integration.py` — Profile update endpoint
- `test_articles_integration.py` — Article CRUD operations
- `test_article_permission.py` — Ownership and permission checks
- `test_article_service.py` — Business logic (read time calculation, slug uniqueness)
- `test_user_service.py` — User service layer

**Test Coverage:** 15 tests covering validators, upload validation, authentication, profile updates, CRUD, permissions, and business logic.

---

## Key Features

### Backend
- **JWT Authentication:** Secure token-based auth with Flask-JWT-Extended
- **Layered Architecture:** Clean separation of concerns (resources → services → repositories)
- **Marshmallow Validation:** Input validation and serialization with custom validators
- **Cloudinary Integration:** Secure image upload with validation (file type, size)
- **Error Handling:** Custom exceptions with meaningful HTTP status codes
- **Database Migrations:** Alembic for version-controlled schema changes
- **Ownership Checks:** Only article owners can edit/delete their content

### Frontend
- **JWT Storage:** Access token stored in localStorage with automatic attachment via interceptor
- **Responsive UI:** Header shows guest (Sign In / Get Started) or authenticated (Profile / Write / Logout) options
- **Image Upload:** Drag-and-drop or file selection for profile and article images
- **Profile Management:** Update first name, last name, bio, and profile picture
- **Article Editor:** Create and edit articles with title, slug, content, topic, and image
- **Loading States:** User feedback during async operations
- **Error Handling:** User-friendly error messages for failed operations

---

## Cloudinary Setup

1. Create free Cloudinary account at https://cloudinary.com
2. Get credentials from Cloudinary Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```
4. Images are stored in folders: `creative-spark/articles` and `creative-spark/users`

---

## Common Tasks

### Database Reset (Development)
```bash
cd backend
source .venv/bin/activate
flask db downgrade
flask db upgrade
```

### Add New Migration
```bash
cd backend
source .venv/bin/activate
flask db migrate -m "Add new column"
flask db upgrade
```

### Create Admin User (Optional)
Add a CLI command or use Flask shell:
```bash
cd backend
source .venv/bin/activate
flask shell
>>> from app.models import User
>>> from app.repositories import UserRepository
>>> user = User(username="admin", email="admin@example.com", password_hash="...", role="admin")
>>> db.session.add(user)
>>> db.session.commit()
```

---

## Deployment Checklist

- [ ] Update `.env` with production credentials
- [ ] Set `FLASK_ENV=production` in backend
- [ ] Set `production=true` in frontend environment
- [ ] Run full test suite: `pytest backend/tests`
- [ ] Build frontend: `npm run build`
- [ ] Ensure database migrations are applied: `flask db upgrade`
- [ ] Verify JWT_SECRET_KEY is strong (32+ chars)
- [ ] Enable HTTPS for all connections
- [ ] Consider upgrading localStorage auth to httpOnly cookies
- [ ] Set up monitoring and logging

---

## Troubleshooting

**Backend won't start:**
- Check PostgreSQL is running: `psql --version`
- Verify `.env` DATABASE_URL is correct
- Run migrations: `flask db upgrade`

**Frontend can't reach backend:**
- Ensure backend runs on port 5001
- Check `environment.development.ts` points to `localhost:5001`
- Verify CORS is enabled if using different origin

**Image upload fails:**
- Verify Cloudinary credentials in `.env`
- Check file is jpg/jpeg/png/webp
- Ensure file size < 5MB
- Check browser console for network errors

**Tests fail:**
- Activate venv: `source backend/.venv/bin/activate`
- Run with verbose: `pytest backend/tests -v`
- Check `.env` has JWT_SECRET_KEY with 32+ characters

---

## Contributing

1. Follow the existing architecture (resources → services → repositories)
2. Add tests for new features
3. Use existing naming conventions
4. Validate with Marshmallow schemas
5. Keep components presentational; business logic in services

---

## License

MIT

---

## Support

For issues or questions, please open an issue on GitHub.

