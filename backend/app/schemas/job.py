from pydantic import BaseModel, Field
from typing import Optional


class JobCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    company: str = Field(..., min_length=2, max_length=200)
    location: str = Field(..., min_length=2, max_length=200)
    description: str = Field(..., min_length=10)
    salary: Optional[int] = None


class JobResponse(BaseModel):
    id: int
    title: str
    company: str
    location: str
    description: str
    salary: Optional[int]
    created_by: int

    class Config:
        from_attributes = True