"""Seed default topics

Revision ID: a1f4d72b92c0
Revises: f02fbeb3b445
Create Date: 2026-08-07 13:57:00.000000

"""
from datetime import datetime

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a1f4d72b92c0'
down_revision = 'f02fbeb3b445'
branch_labels = None
depends_on = None


TOPIC_NAMES = [
    "Life",
    "Work",
    "Science",
    "Technology",
    "Media",
    "Society",
    "Culture",
    "Nature",
    "Sport",
    "World",
]


def upgrade():
    connection = op.get_bind()
    for topic_name in TOPIC_NAMES:
        exists = connection.execute(
            sa.text("SELECT 1 FROM topics WHERE lower(name) = lower(:name)"),
            {"name": topic_name},
        ).fetchone()

        if exists is None:
            connection.execute(
                sa.text(
                    "INSERT INTO topics (name, created_at) VALUES (:name, :created_at)"
                ),
                {
                    "name": topic_name,
                    "created_at": datetime.utcnow(),
                },
            )


def downgrade():
    connection = op.get_bind()
    for topic_name in TOPIC_NAMES:
        connection.execute(
            sa.text("DELETE FROM topics WHERE name = :name"),
            {"name": topic_name},
        )
