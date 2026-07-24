import json

from sqlalchemy.orm import Session

from app.repositories.resume_analysis_repository import (
    ResumeAnalysisRepository,
)


class ResumeAnalysisService:

    @staticmethod
    def get_resume_analysis(
        db: Session,
        resume_id: int
    ):

        analysis = ResumeAnalysisRepository.get_by_resume(
            db,
            resume_id
        )

        if not analysis:
            raise ValueError(
                "Resume analysis not found"
            )

        return {
            "ats_score": analysis.ats_score,
            "detected_skills": json.loads(
                analysis.detected_skills or "[]"
            ),
            "recommendations": json.loads(
                analysis.recommendations or "[]"
            )
        }