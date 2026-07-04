from fastapi import APIRouter, Depends, HTTPException
from anthropic import Anthropic
from app.core.config import ANTHROPIC_API_KEY
from app.dependencies.auth import get_current_user
from app.models.user import User
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/v1/copilot",
    tags=["Copilot"]
)

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []

_client = Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

@router.post("/chat")
def chat_with_copilot(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    if not _client:
        # Fallback to local rule-based responses if Anthropic is not configured
        return {
            "response": get_mock_response(request.message)
        }

    system_prompt = (
        "You are Sentinel Security Copilot, an advanced AI security assistant integrated into the Sentinel AI Phishing Detection Platform. "
        "Your role is to help users triage threats, explain scan results (such as phishing URLs, suspicious emails, and texts), "
        "and provide recommendations for securing their environments. "
        "Be concise, highly professional, and direct in your answers. Keep responses under 4 sentences unless specifically asked for more details."
    )

    try:
        messages = []
        # Map history to Anthropic format
        for item in request.history:
            role = "user" if item.get("role") == "user" else "assistant"
            messages.append({"role": role, "content": item.get("text", "")})
        
        messages.append({"role": "user", "content": request.message})

        message_response = _client.messages.create(
            model="claude-3-5-haiku-20241022",
            max_tokens=400,
            system=system_prompt,
            messages=messages
        )
        answer = message_response.content[0].text.strip()
        return {"response": answer}
    except Exception as e:
        return {
            "response": f"I encountered an error trying to process that: {str(e)}. However, as a local safeguard, I suggest manually reviewing the logs."
        }

def get_mock_response(message: str) -> str:
    lower = message.lower()
    if "critical" in lower or "summarize" in lower:
        return "Based on your recent scans, there are no immediate critical threats pending action. Check the Reports page for full details."
    if "bec" in lower or "trend" in lower:
        return "Business Email Compromise (BEC) attacks usually target corporate finance. Keep analyzing email bodies to view trends."
    if "incident" in lower or "report" in lower:
        return "You can generate PDF or CSV incident reports directly from the Reports page for any scanned item."
    if "block" in lower:
        return "Sentinel does not currently support automated firewall blocking, but flagged domains can be quarantined."
    return "I am the Sentinel Security Copilot. I'm running in local fallback mode. What would you like to check?"
