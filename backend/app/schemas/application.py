from pydantic import BaseModel

from app.schemas.job import JobResponse
from app.schemas.user import UserResponse


class ApplicationCreate(BaseModel):
    job_id: int


class ApplicationStatusUpdate(BaseModel):
    status: str


class ApplicationResponse(BaseModel):
    id: int
    status: str
    user: UserResponse
    job: JobResponse

    class Config:
        from_attributes = True