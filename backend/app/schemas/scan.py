from pydantic import BaseModel
from datetime import datetime


class URLScanRequest(BaseModel):
    url: str


class EmailScanRequest(BaseModel):
    email_text: str


class TextScanRequest(BaseModel):
    text: str


class ScanResponse(BaseModel):
    id: int
    scan_type: str
    content: str
    result: str
    risk_score: int
    risk_level: str
    created_at: datetime

    class Config:
        from_attributes = True


from app.schemas.user import UserOut

class AdminScanResponse(BaseModel):
    id: int
    user_id: int
    scan_type: str
    content: str
    result: str
    risk_score: int
    risk_level: str
    created_at: datetime
    updated_at: datetime
    user: UserOut | None = None

    class Config:
        from_attributes = True