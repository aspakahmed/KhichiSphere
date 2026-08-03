"""prevent duplicate applications

Revision ID: a3b7d9e1f2c4
Revises: 2210bf5c4794
"""

from alembic import op


revision = "a3b7d9e1f2c4"
down_revision = "2210bf5c4794"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_unique_constraint(
        "uq_applications_user_id_job_id",
        "applications",
        ["user_id", "job_id"],
    )


def downgrade() -> None:
    op.drop_constraint(
        "uq_applications_user_id_job_id",
        "applications",
        type_="unique",
    )
