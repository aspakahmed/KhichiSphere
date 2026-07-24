from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.application_repository import ApplicationRepository
from app.repositories.job_repository import JobRepository


ALLOWED_APPLICATION_STATUSES = {
    "Pending",
    "Screening",
    "Shortlisted",
    "Interview",
    "Offer",
    "Hired",
    "Rejected",
}


class ApplicationService:

    @staticmethod
    def apply_job(
        db: Session,
        current_user: User,
        job_id: int
    ):
        job = JobRepository.get_by_id(
            db,
            job_id
        )

        if not job:
            raise ValueError("Job not found")

        existing_application = (
            ApplicationRepository.get_by_user_and_job(
                db,
                current_user.id,
                job_id
            )
        )

        if existing_application:
            raise ValueError(
                "You have already applied for this job"
            )

        return ApplicationRepository.create(
            db,
            current_user.id,
            job_id
        )

    @staticmethod
    def my_applications(
        db: Session,
        current_user: User
    ):
        return ApplicationRepository.get_all_by_user(
            db,
            current_user.id
        )

    @staticmethod
    def get_all_applications(
        db: Session
    ):
        return ApplicationRepository.get_all(db)

    @staticmethod
    def update_application_status(
        db: Session,
        application_id: int,
        status: str
    ):
        if status not in ALLOWED_APPLICATION_STATUSES:
            raise ValueError("Invalid application status")

        application = ApplicationRepository.get_by_id(
            db,
            application_id
        )

        if not application:
            raise ValueError("Application not found")

        return ApplicationRepository.update_status(
            db,
            application,
            status
        )