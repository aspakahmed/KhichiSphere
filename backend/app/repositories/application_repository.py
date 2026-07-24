from sqlalchemy.orm import Session, joinedload

from app.models.application import Application


class ApplicationRepository:

    @staticmethod
    def create(
        db: Session,
        user_id: int,
        job_id: int
    ):
        application = Application(
            user_id=user_id,
            job_id=job_id
        )

        db.add(application)
        db.commit()
        db.refresh(application)

        return application

    @staticmethod
    def get_by_user_and_job(
        db: Session,
        user_id: int,
        job_id: int
    ):
        return (
            db.query(Application)
            .filter(
                Application.user_id == user_id,
                Application.job_id == job_id
            )
            .first()
        )

    @staticmethod
    def get_all_by_user(
        db: Session,
        user_id: int
    ):
        return (
            db.query(Application)
            .options(
                joinedload(Application.user),
                joinedload(Application.job)
            )
            .filter(Application.user_id == user_id)
            .all()
        )

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(Application)
            .options(
                joinedload(Application.user),
                joinedload(Application.job)
            )
            .order_by(Application.id.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        application_id: int
    ):
        return (
            db.query(Application)
            .options(
                joinedload(Application.user),
                joinedload(Application.job)
            )
            .filter(Application.id == application_id)
            .first()
        )

    @staticmethod
    def update_status(
        db: Session,
        application: Application,
        status: str
    ):
        application.status = status

        db.commit()
        db.refresh(application)

        return application