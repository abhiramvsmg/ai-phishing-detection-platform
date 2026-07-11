from pydantic import BaseModel
from datetime import datetime
from app.schemas.user import UserOut

class ActivityLogResponse(BaseModel):
    id: int
    user_id: int
    action: str
    description: str
    ip_address: str | None = None
    created_at: datetime
    user: UserOut | None = None

    class Config:
        from_attributes = True
