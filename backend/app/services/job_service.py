from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.job_repository import JobRepository
from app.schemas.job import JobCreate


class JobService:

    @staticmethod
    def create_job(
        db: Session,
        job: JobCreate,
        current_user: User
    ):

        return JobRepository.create(
            db=db,
            title=job.title,
            company=job.company,
            location=job.location,
            description=job.description,
            salary=job.salary,
            created_by=current_user.id
        )

    @staticmethod
    def get_all_jobs(
        db: Session
    ):
        return JobRepository.get_all(db)

    @staticmethod
    def get_job(
        db: Session,
        job_id: int
    ):
        return JobRepository.get_by_id(
            db,
            job_id
        )

    @staticmethod
    def delete_job(
        db: Session,
        job_id: int
    ):

        job = JobRepository.get_by_id(
            db,
            job_id
        )

        if not job:
            raise ValueError("Job not found")

        JobRepository.delete(
            db,
            job
        )

        return {
            "message": "Job deleted successfully"
        }