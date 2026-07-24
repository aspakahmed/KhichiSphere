from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_user,
    require_candidate,
    require_recruiter,
)
from app.database.database import get_db
from app.models.user import User
from app.schemas.application import (
    ApplicationResponse,
    ApplicationStatusUpdate,
)
from app.services.application_service import ApplicationService


router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


@router.post(
    "/apply/{job_id}",
    response_model=ApplicationResponse
)
def apply_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        return ApplicationService.apply_job(
            db,
            current_user,
            job_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "/my",
    response_model=list[ApplicationResponse]
)
def my_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_candidate)
):
    return ApplicationService.my_applications(
        db,
        current_user
    )


@router.get(
    "",
    response_model=list[ApplicationResponse]
)
def get_all_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter)
):
    return ApplicationService.get_all_applications(db)


@router.patch(
    "/{application_id}/status",
    response_model=ApplicationResponse
)
def update_application_status(
    application_id: int,
    payload: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter)
):
    try:
        return ApplicationService.update_application_status(
            db,
            application_id,
            payload.status
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )