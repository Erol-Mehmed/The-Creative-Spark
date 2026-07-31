from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import api, bcrypt, db, jwt, migrate

import app.models


def create_app():
    application = Flask(__name__)

    application.config.from_object(Config)

    CORS(application)

    db.init_app(application)
    migrate.init_app(application, db)
    jwt.init_app(application)
    bcrypt.init_app(application)

    from app.routes import register_routes

    register_routes(api)

    api.init_app(application)

    return application
