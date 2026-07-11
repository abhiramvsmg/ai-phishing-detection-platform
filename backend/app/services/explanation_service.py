import os
from anthropic import Anthropic
from app.core.config import ANTHROPIC_API_KEY

_client = Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None


def generate_explanation(content: str, result: str, risk_score: int, risk_level: str) -> dict:
    """
    Calls Claude to generate a human-readable explanation for a
    scan verdict. Returns a dict with 'threats' (list of short
    indicator strings) and 'summary' (one paragraph explanation).

    If no API key is configured, returns a clear placeholder
    instead of crashing - callers should check for this.
    """
    if _client is None:
        return {
            "threats": [],
            "summary": "AI explanation unavailable - ANTHROPIC_API_KEY not configured.",
        }

    prompt = f"""You are a cybersecurity analyst explaining a phishing detection result to a user.

Scanned content: {content}
Verdict: {result}
Risk score: {risk_score}/100
Risk level: {risk_level}

Provide:
1. A list of 2-4 short, specific indicators that justify this verdict (each under 12 words)
2. A 1-2 sentence plain-English summary explaining why this content received this verdict

Respond ONLY with valid JSON in this exact format, no other text:
{{"threats": ["indicator 1", "indicator 2"], "summary": "explanation here"}}"""

    try:
        message = _client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=300,
            messages=[{"role": "user", "content": prompt}],
        )
        text = message.content[0].text.strip()
        import json
        return json.loads(text)
    except Exception as e:
        return {
            "threats": [],
            "summary": f"AI explanation failed to generate: {str(e)}",
        }