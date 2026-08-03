from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    DateTime,
    String,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.database import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False,
        unique=True
    )

    parsed_text = Column(
        Text,
        nullable=True
    )

    detected_skills = Column(
        Text,
        nullable=True
    )

    ats_score = Column(
        Integer,
        default=0
    )

    summary = Column(
        Text,
        nullable=True
    )

    recommendations = Column(
        Text,
        nullable=True
    )

    experience_years = Column(
        String(50),
        nullable=True
    )

    education = Column(
        Text,
        nullable=True
    )

    projects = Column(
        Text,
        nullable=True
    )

    analysis_status = Column(
        String(30),
        default="pending"
    )

    ai_model = Column(
        String(100),
        default="KhichiSphere-AI-v1"
    )

    analyzed_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    resume = relationship(
        "Resume",
        back_populates="analysis"
    )
