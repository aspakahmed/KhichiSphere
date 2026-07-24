from pydantic import BaseModel


class ResumeAnalysisResponse(BaseModel):
    ats_score: int
    detected_skills: list[str]
    recommendations: list[str]

    class Config:
        from_attributes = True