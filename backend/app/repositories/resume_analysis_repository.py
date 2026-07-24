from sqlalchemy.orm import Session

from app.models.resume_analysis import ResumeAnalysis


class ResumeAnalysisRepository:

    @staticmethod
    def create(
        db: Session,
        resume_id: int,
        parsed_text: str,
        detected_skills: str,
        ats_score: int,
        recommendations: str,
    ):
        analysis = ResumeAnalysis(
            resume_id=resume_id,
            parsed_text=parsed_text,
            detected_skills=detected_skills,
            ats_score=ats_score,
            recommendations=recommendations,
            analysis_status="completed",
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return analysis

    @staticmethod
    def get_by_resume(
        db: Session,
        resume_id: int
    ):
        return (
            db.query(ResumeAnalysis)
            .filter(ResumeAnalysis.resume_id == resume_id)
            .first()
        )