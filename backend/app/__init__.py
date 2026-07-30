from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import api, db, jwt, migrate


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    api.init_app(app)

    from app.routes import register_routes

    register_routes(api)

    return app