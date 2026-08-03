from sqlalchemy.orm import Session

from app.models.resume_analysis import ResumeAnalysis


class ResumeAnalysisRepository:

    @staticmethod
    def upsert(
        db: Session,
        resume_id: int,
        parsed_text: str,
        detected_skills: str,
        ats_score: int,
        recommendations: str,
    ):
        analysis = ResumeAnalysisRepository.get_by_resume(db, resume_id)
        if analysis is None:
            analysis = ResumeAnalysis(resume_id=resume_id)
            db.add(analysis)

        analysis.parsed_text = parsed_text
        analysis.detected_skills = detected_skills
        analysis.ats_score = ats_score
        analysis.recommendations = recommendations
        analysis.analysis_status = "completed"
        db.flush()

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
