from collections import Counter
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload

from app.core.dependencies import require_recruiter_or_admin
from app.database.database import get_db
from app.models.application import Application
from app.models.job import Job
from app.models.user import User

router = APIRouter(prefix="/recruitment", tags=["Recruitment"])


def _applications(db: Session):
    return (
        db.query(Application)
        .options(joinedload(Application.user), joinedload(Application.job))
        .order_by(Application.id.desc())
        .all()
    )


@router.get("/candidates")
def candidates(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter_or_admin),
):
    applications = _applications(db)
    grouped = {}
    for item in applications:
        user = item.user
        if user.id not in grouped:
            grouped[user.id] = {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
                "is_active": user.is_active,
                "applications_count": 0,
                "latest_status": item.status,
                "latest_job": item.job.title,
                "latest_company": item.job.company,
            }
        grouped[user.id]["applications_count"] += 1
    return list(grouped.values())


@router.get("/companies")
def companies(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter_or_admin),
):
    jobs = db.query(Job).order_by(Job.id.desc()).all()
    applications = _applications(db)
    app_counts = Counter(item.job.company for item in applications)
    grouped = {}
    for job in jobs:
        company = grouped.setdefault(job.company, {
            "name": job.company,
            "locations": set(),
            "open_jobs": 0,
            "applications": 0,
        })
        company["locations"].add(job.location)
        company["open_jobs"] += 1
        company["applications"] = app_counts[job.company]
    return [
        {
            **item,
            "locations": sorted(item["locations"]),
            "status": "Active" if item["open_jobs"] else "On hold",
        }
        for item in grouped.values()
    ]


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter_or_admin),
):
    jobs = db.query(Job).all()
    applications = _applications(db)
    candidates = {item.user_id for item in applications}
    companies = {job.company for job in jobs}
    status_counts = Counter(item.status for item in applications)
    recent = [
        {
            "id": item.id,
            "candidate": item.user.full_name,
            "job": item.job.title,
            "company": item.job.company,
            "status": item.status,
        }
        for item in applications[:5]
    ]
    return {
        "total_jobs": len(jobs),
        "total_candidates": len(candidates),
        "total_companies": len(companies),
        "total_applications": len(applications),
        "pipeline": dict(status_counts),
        "recent_applications": recent,
    }


@router.get("/analytics")
def analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter_or_admin),
):
    jobs = db.query(Job).all()
    applications = _applications(db)
    counts = Counter(item.status for item in applications)
    company_counts = Counter(job.company for job in jobs)
    job_counts = Counter(item.job.title for item in applications)
    hired = counts.get("Hired", 0)
    active = sum(v for k, v in counts.items() if k not in {"Hired", "Rejected"})
    return {
        "total_hires": hired,
        "active_pipeline": active,
        "total_applications": len(applications),
        "total_jobs": len(jobs),
        "funnel": dict(counts),
        "top_companies": company_counts.most_common(5),
        "top_jobs": job_counts.most_common(5),
    }
