from sqlalchemy.orm import Session

from app.models.job import Job


class JobRepository:

    @staticmethod
    def create(
        db: Session,
        title: str,
        company: str,
        location: str,
        description: str,
        salary: int | None,
        created_by: int
    ):
        job = Job(
            title=title,
            company=company,
            location=location,
            description=description,
            salary=salary,
            created_by=created_by
        )

        db.add(job)
        db.commit()
        db.refresh(job)

        return job

    @staticmethod
    def get_all(db: Session):
        return db.query(Job).all()

    @staticmethod
    def get_by_id(
        db: Session,
        job_id: int
    ):
        return db.query(Job).filter(
            Job.id == job_id
        ).first()

    @staticmethod
    def delete(
        db: Session,
        job: Job
    ):
        db.delete(job)
        db.commit()