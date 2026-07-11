from typing import List
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.dependencies.roles import (
    require_admin
)
from app.schemas.user import UserOut
from app.schemas.scan import AdminScanResponse
from app.schemas.report import AdminReportResponse
from app.schemas.activity import ActivityLogResponse

from app.services.admin_service import (
    admin_users,
    admin_scans,
    admin_reports,
    admin_activities
)
router = APIRouter(
    prefix="/api/v1/admin",
    tags=["Admin"]
)
@router.get("/dashboard")
def admin_dashboard(
        admin=Depends(require_admin)
):
    return {
        "message": f"Welcome Admin {admin.name}"
    }
@router.get("/users", response_model=List[UserOut])
def get_all_users_api(
        db: Session = Depends(get_db),
        admin=Depends(require_admin)
):
    return admin_users(db)
@router.get("/scans", response_model=List[AdminScanResponse])
def get_all_scans_api(
        db: Session = Depends(get_db),
        admin=Depends(require_admin)
):
    return admin_scans(db)
@router.get("/reports", response_model=List[AdminReportResponse])
def get_all_reports_api(
        db: Session = Depends(get_db),
        admin=Depends(require_admin)
):
    return admin_reports(db)
@router.get("/activities", response_model=List[ActivityLogResponse])
def get_all_activities_api(
        db: Session = Depends(get_db),
        admin=Depends(require_admin)
):
    return admin_activities(db)