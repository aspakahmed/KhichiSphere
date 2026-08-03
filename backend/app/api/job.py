from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_recruiter_or_admin
from app.database.database import get_db
from app.models.user import User
from app.schemas.job import JobCreate, JobResponse
from app.services.job_service import JobService

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post(
    "",
    response_model=JobResponse
)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter_or_admin)
):
    return JobService.create_job(
        db,
        job,
        current_user
    )


@router.get(
    "",
    response_model=list[JobResponse]
)
def get_all_jobs(
    db: Session = Depends(get_db)
):
    return JobService.get_all_jobs(db)


@router.get(
    "/{job_id}",
    response_model=JobResponse
)
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = JobService.get_job(
        db,
        job_id
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job


@router.delete(
    "/{job_id}",
    dependencies=[Depends(require_recruiter_or_admin)]
)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    try:
        return JobService.delete_job(
            db,
            job_id
        )
    except ValueError as e:
        raise HTTPException(
            status_code=409 if "applications" in str(e) else 404,
            detail=str(e)
        )
