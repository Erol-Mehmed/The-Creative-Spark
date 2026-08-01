from app.resources.auth import (
    LoginResource,
    MeResource,
    RegisterResource,
)
from app.resources.health import HealthResource


def register_routes(api):
    api.add_resource(
        HealthResource,
        "/api/health",
    )

    api.add_resource(
        RegisterResource,
        "/api/auth/register",
    )

    api.add_resource(
        LoginResource,
        "/api/auth/login",
    )

    api.add_resource(
        MeResource,
        "/api/auth/me",
    )
