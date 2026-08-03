import json
import logging
import uuid
from pathlib import Path

from fastapi import UploadFile
from fastapi.concurrency import run_in_threadpool
from sqlalchemy.orm import Session

from app.ai.resume_analyzer import ResumeAnalyzer
from app.core.config import settings
from app.models.user import User
from app.repositories.resume_analysis_repository import ResumeAnalysisRepository
from app.repositories.resume_repository import ResumeRepository

logger = logging.getLogger(__name__)


class ResumeService:

    @staticmethod
    def get_current_resume(db: Session, current_user: User):
        return ResumeRepository.get_by_user(db, current_user.id)

    @staticmethod
    async def upload_resume(
        db: Session,
        file: UploadFile,
        current_user: User,
    ):
        if file.content_type not in {None, "application/pdf", "application/x-pdf"}:
            raise ValueError("Only PDF files are allowed")

        original_filename = Path(file.filename or "resume.pdf").name
        if not original_filename.lower().endswith(".pdf"):
            raise ValueError("Only PDF files are allowed")

        content = await file.read(settings.MAX_RESUME_UPLOAD_BYTES + 1)
        if not content:
            raise ValueError("Uploaded resume is empty")
        if len(content) > settings.MAX_RESUME_UPLOAD_BYTES:
            raise ValueError("Resume exceeds the maximum allowed file size")
        if not content.startswith(b"%PDF-"):
            raise ValueError("Uploaded file is not a valid PDF")

        upload_dir = Path(settings.UPLOAD_DIR).resolve()
        upload_dir.mkdir(parents=True, exist_ok=True)
        stored_path = upload_dir / f"{uuid.uuid4()}.pdf"

        try:
            stored_path.write_bytes(content)
            analysis_data = await run_in_threadpool(
                ResumeAnalyzer.analyze, str(stored_path)
            )

            existing = ResumeRepository.get_by_user(db, current_user.id)
            if existing is None:
                resume = ResumeRepository.create(
                    db=db,
                    filename=original_filename,
                    filepath=str(stored_path),
                    user_id=current_user.id,
                )
                old_path = None
            else:
                old_path = Path(existing.filepath)
                resume = ResumeRepository.update(
                    existing, original_filename, str(stored_path)
                )

            ResumeAnalysisRepository.upsert(
                db=db,
                resume_id=resume.id,
                parsed_text=analysis_data["text"],
                detected_skills=json.dumps(analysis_data["skills"]),
                ats_score=analysis_data["ats_score"],
                recommendations=json.dumps(analysis_data["recommendations"]),
            )
            db.commit()
            db.refresh(resume)

            if old_path and old_path != stored_path and old_path.is_file():
                try:
                    old_path.unlink()
                except OSError:
                    logger.warning("Could not remove replaced resume file: %s", old_path)
            return resume
        except ValueError:
            db.rollback()
            if stored_path.is_file():
                stored_path.unlink()
            raise
        except Exception as exc:
            db.rollback()
            if stored_path.is_file():
                stored_path.unlink()
            raise ValueError("Unable to process the uploaded resume") from exc
        finally:
            await file.close()
