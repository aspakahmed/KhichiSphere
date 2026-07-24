from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.user import router as user_router
from app.api.job import router as job_router
from app.api.application import router as application_router
from app.api.resume import router as resume_router
from app.api.recruitment import router as recruitment_router

app = FastAPI(
    title=settings.APP_NAME,
    description="The Future of Intelligent Hiring",
    version=settings.APP_VERSION,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(job_router)
app.include_router(application_router)
app.include_router(resume_router)
app.include_router(recruitment_router)


@app.get("/")
def root():
    return {
        "company": settings.COMPANY_NAME,
        "product": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "message": "Welcome to MemberSphere API 🚀",
    }