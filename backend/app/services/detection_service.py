def analyze_url(url: str):

    url = url.lower()

    suspicious_words = [
        "login",
        "verify",
        "security",
        "update",
        "bank",
        "account",
        "signin",
        "confirm"
    ]

    score = 0

    for word in suspicious_words:
        if word in url:
            score += 20

    if ".xyz" in url:
        score += 30

    if ".top" in url:
        score += 30

    if score >= 70:
        result = "PHISHING"
        risk_level = "HIGH"

    elif score >= 40:
        result = "SUSPICIOUS"
        risk_level = "MEDIUM"

    else:
        result = "SAFE"
        risk_level = "LOW"

    return {
        "result": result,
        "risk_score": score,
        "risk_level": risk_level
    }



def analyze_email(email_text: str):
    text = email_text.lower()

    suspicious_words = [
        "verify",
        "click here",
        "urgent",
        "bank",
        "password",
        "account suspended",
        "login"
    ]

    score = 0

    for word in suspicious_words:
        if word in text:
            score += 20

    if score >= 80:
        result = "PHISHING"
        level = "CRITICAL"

    elif score >= 60:
        result = "PHISHING"
        level = "HIGH"

    elif score >= 20:
        result = "SUSPICIOUS"
        level = "MEDIUM"

    else:
        result = "SAFE"
        level = "LOW"

    return {
        "result": result,
        "risk_score": score,
        "risk_level": level
    }


def analyze_text(text: str):

    text = text.lower()

    suspicious_words = [
        "click here",
        "urgent",
        "verify",
        "password",
        "bank",
        "otp",
        "prize",
        "won",
        "lottery",
        "account suspended"
    ]

    score = 0

    for word in suspicious_words:
        if word in text:
            score += 20

    score = min(score, 100)

    if score >= 80:
        result = "PHISHING"
        risk_level = "CRITICAL"

    elif score >= 60:
        result = "PHISHING"
        risk_level = "HIGH"

    elif score >= 30:
        result = "SUSPICIOUS"
        risk_level = "MEDIUM"

    else:
        result = "SAFE"
        risk_level = "LOW"

    return {
        "result": result,
        "risk_score": score,
        "risk_level": risk_level
    }