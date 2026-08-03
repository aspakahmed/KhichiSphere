from app.ai.resume_parser import ResumeParser
from app.ai.skill_extractor import SkillExtractor
from app.ai.ats_engine import ATSEngine


class ResumeAnalyzer:

    @staticmethod
    def analyze(filepath: str):
        """
        Complete AI Resume Analysis Pipeline
        """

        # Extract text
        text = ResumeParser.extract_text(filepath)
        # Extract skills
        skills = SkillExtractor.extract(text)

        # Calculate ATS
        ats = ATSEngine.calculate(
            text=text,
            skills=skills
        )

        return {
            "text": text,
            "skills": skills,
            "total_skills": len(skills),
            "ats_score": ats["ats_score"],
            "recommendations": ats["recommendations"],
        }
