import json
import os
import uuid

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.ai.resume_analyzer import ResumeAnalyzer
from app.models.user import User
from app.repositories.resume_analysis_repository import ResumeAnalysisRepository
from app.repositories.resume_repository import ResumeRepository


UPLOAD_DIR = "uploads/resumes"

os.makedirs(UPLOAD_DIR, exist_ok=True)


class ResumeService:

    @staticmethod
    async def upload_resume(
        db: Session,
        file: UploadFile,
        current_user: User
    ):

        if file.content_type != "application/pdf":
            raise ValueError("Only PDF files are allowed")

        existing = ResumeRepository.get_by_user(
            db,
            current_user.id
        )

        if existing:
            if os.path.exists(existing.filepath):
                os.remove(existing.filepath)

            db.delete(existing)
            db.commit()

        filename = f"{uuid.uuid4()}.pdf"

        filepath = os.path.join(
            UPLOAD_DIR,
            filename
        )

        content = await file.read()

        with open(filepath, "wb") as f:
            f.write(content)

        resume = ResumeRepository.create(
            db=db,
            filename=file.filename,
            filepath=filepath,
            user_id=current_user.id
        )

        try:
            ai_result = ResumeAnalyzer.analyze(filepath)

            ResumeAnalysisRepository.create(
                db=db,
                resume_id=resume.id,
                parsed_text=ai_result["text"],
                detected_skills=json.dumps(ai_result["skills"]),
                ats_score=ai_result["ats_score"],
                recommendations=json.dumps(ai_result["recommendations"]),
            )

        except Exception:
            if os.path.exists(filepath):
                os.remove(filepath)

            db.delete(resume)
            db.commit()

            raise ValueError("Resume AI analysis failed")

        return resume
