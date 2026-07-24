from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    filepath = Column(String, nullable=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    user = relationship(
        "User",
        back_populates="resume"
    )
    analysis = relationship(
    "ResumeAnalysis",
    back_populates="resume",
    uselist=False,
    cascade="all, delete-orphan"
)