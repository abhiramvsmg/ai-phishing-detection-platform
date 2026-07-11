from pydantic import BaseModel
from datetime import datetime

class ReportResponse(BaseModel):
    id: int
    user_id: int
    scan_id: int
    report_type: str
    details: str
    created_at: datetime

    class Config:
        from_attributes = True


from app.schemas.user import UserOut

class AdminReportResponse(BaseModel):
    id: int
    user_id: int
    scan_id: int
    report_type: str
    details: str
    created_at: datetime
    user: UserOut | None = None

    class Config:
        from_attributes = True
