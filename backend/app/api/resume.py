from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.resume import ResumeResponse
from app.schemas.analysis import ResumeAnalysisResponse
from app.services.resume_analysis_service import ResumeAnalysisService
from app.services.resume_service import ResumeService

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post(
    "/upload",
    response_model=ResumeResponse
)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        return await ResumeService.upload_resume(
            db,
            file,
            current_user
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get("/analysis", response_model=ResumeAnalysisResponse)
def get_resume_analysis(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    resume = ResumeService.get_current_resume(db, current_user)
    if resume is None:
        raise HTTPException(status_code=404, detail="Resume not found")
    try:
        return ResumeAnalysisService.get_resume_analysis(db, resume.id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
