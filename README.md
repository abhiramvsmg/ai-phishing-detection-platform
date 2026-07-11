# 🛡️ Sentinel — Enterprise AI Phishing Detection & Threat Forensics Platform

Sentinel is a premium, light-themed, full-stack cybersecurity intelligence platform. It combines real-time multi-agent threat scanners, suspicious text NLP analysis, automated ReportLab document exports, and an interactive **Claude AI Security Copilot** under a responsive, hardware-accelerated 3D dashboard.

---

## 1. 🚀 Core Capabilities & Threat Forensics Data Flow

Sentinel integrates multiple verification layers to analyze incoming assets and generate cryptographic security reports:

```mermaid
graph TD
    A[Next.js 16 Web Dashboard] -->|Client REST Requests| B[FastAPI Gateway]
    B -->|User Authentication| C[JWT Security Manager]
    B -->|Database Session| D[SQLAlchemy ORM]
    D -->|Persistent Transactions| E[(PostgreSQL Database)]
    
    B -->|Deep Forensic Sweep| F[Threat Intel Pipeline]
    F -->|DNS & SSL Validation| G[Network Validator]
    F -->|File & URL Hash Queries| H[VirusTotal API v3]
    F -->|Social Engineering Matching| I[Google Safe Browsing API v4]
    
    B -->|LLM Scan Breakdown| J[Claude Sonnet 4.5 API]
    B -->|Real-Time Chat Copilot| K[Claude Haiku Chat API]
    B -->|Cryptographic PDF Exports| L[ReportLab Engine]
```

---

## 2. 🧠 Advanced AI Cybersecurity Architecture

### Heuristics Threat Engine
* **Regex Signature Scanners**: Detects credential-harvesting parameters, high-entropy subdomain strings, character squatted lookalikes (homoglyphs), and suspicious domain extensions.
* **NLP Keyword Classifiers**: Assesses grammatical panic indicators, urgent call-to-actions, financial extortion syntax, and spoofed bank routing strings.

### Threat Intelligence APIs
* **VirusTotal API v3**: Translates scanned targets into base64 SHA-256 identifier tokens, query scanning results across 70+ antivirus engines, and pulls historical registrar threat tags.
* **Google Safe Browsing API v4**: Cross-references URLs against global malware lists, unwanted software registries (PUAs), and active social engineering campaigns.

### Large Language Model Core (Claude integration)
* **Claude Sonnet 4.5 (Scan Explanations)**: Dynamically extracts forensic indicators from scan results to write concise, professional risk summary briefs explaining *why* a particular asset received its classification.
* **Claude Haiku (Security Copilot)**: Powers an interactive chatbot in the sidebar. It accepts message histories, assists operators with incident triages, and provides immediate mitigation steps for malicious indicators.

---

## 3. 🎨 Tactile 3D Visuals & Premium Interface Design

Sentinel features a high-fidelity light theme constructed with **Tailwind CSS v4** and **Framer Motion**, tailored to maximize tactile interactivity:

* **Tactile 3D Cards (`TiltCard.tsx`)**: Utilizes mouse-pointer tracking and CSS 3D perspective space to tilt cards dynamically based on hover coordinates. Integrates interactive cursor radial-light glows and shiny glass-like reflection glare overlays. Automatically respects system `prefers-reduced-motion` settings.
* **Sweeping Concentric Radar (`RadarScanner.tsx`)**: An animated vector graphics concentric radar module that sweeps the threat surface dynamically, indicating real-time analysis steps.
* **Forensics Typewriter (`TypewriterText.tsx`)**: Streams AI explanation text letter-by-letter with a pulsing blinking caret to mimic live streaming terminal feeds.
* **Smooth Physics Animations**: Choreographed page entries, spring-physics scale feedback on dashboard components, and slide-in panels for a highly premium, state-of-the-art visual experience.

---

## 4. 🧭 Complete Website URLs & Navigation Map

The Next.js 16 App Router handles client navigation, providing the following distinct interfaces:

* **Landing Page (`/`)**: High-converting visual overview featuring animated client stat cards, interactive core features, and prompt entry vectors.
* **Sign In (`/login`)**: Secure session gateway with validation messaging, layout transitions, and credentials hashing checks.
* **Sign Up (`/register`)**: Register accounts by submitting full names, emails, company domains, and passwords.
* **Dashboard Home (`/dashboard`)**: General telemetry view showcasing active security stats, monthly threat charts, and recent scan logs.
* **Deep Threat Scanner (`/dashboard/scanner`)**: Live URL and content scan launcher featuring advanced forensic module toggles, radar scanner visualizations, and AI summaries.
* **Email Forensics (`/dashboard/email-analysis`)**: Specialized text classifier designed to evaluate message bodies, headers, and social engineering copy.
* **Threat Intel (`/dashboard/threat-intel`)**: Public dashboard of all active global indicators flagged as high-risk by the platform.
* **Security Analytics (`/dashboard/analytics`)**: Recharts-powered graphs highlighting risk-distribution density, daily scan velocity, and threat categories.
* **Incident Reports (`/dashboard/reports`)**: Complete document log containing generated forensic exports, with options to download reports as standard PDFs or CSV sheets.
* **Operators Directory (`/dashboard/team`)**: Active list of organizational members, their administrative roles, status tags, and email handles.
* **System Settings (`/dashboard/settings`)**: Interface to rotate credentials, view API rate limits, toggle MFA, and configure active scanner models.

---

## 5. 🔌 Platform API Endpoint Matrix

FastAPI exposes fully authenticated endpoints under `/api/v1` utilizing JWT bearer tokens:

### 🔐 Authentication (`/api/v1/auth`)
* `POST /register` — Register a new account model.
* `POST /login` — Authenticate credentials and return access tokens.
* `POST /token` — Verify active token session.

### 🧑‍💼 Users (`/api/v1/users`)
* `GET /me` — Retrieve active profile details (name, email, role).

### 📊 Dashboard & Telemetry (`/api/v1/dashboard`)
* `GET /stats` — Total scan count, malicious triggers, and accuracy rate metrics.
* `GET /recent-scans` — Latest threat sweeps list.
* `GET /risk-distribution` — Risk severity categorization data (LOW / MEDIUM / HIGH).

### 🔍 Scans & Analysis (`/api/v1/scans`)
* `POST /url` — Scan website addresses for malware signatures.
* `POST /email` — Analyze message structures for spam/phishing keywords.
* `POST /text` — Analyze suspicious text copy.
* `GET /` — Fetch a user's scan history logs.
* `GET /{scan_id}` — Retrieve details of a specific scan.
* `GET /{scan_id}/explain` — Request a Claude-powered forensic breakdown.

### 📄 Reports & Exports (`/api/v1/reports`)
* `POST /generate/{scan_id}` — Build and compile report records.
* `GET /` — List all compiled threat reports.
* `POST /export/pdf/{report_id}` — Compile and stream a cryptographic PDF report.
* `POST /export/csv/{report_id}` — Stream threat analysis records in CSV matrix format.

### 🤖 AI Copilot Chat (`/api/v1/copilot`)
* `POST /chat` — Converse with Claude Security Copilot, passing message history.

---

## 6. 🛠️ Local Development & Environment Setup

### Prerequisites
* **Python 3.10+**
* **Node.js 18+**
* **PostgreSQL Database** (running locally or via Docker)

### Step 1: Start PostgreSQL via Docker
If you do not have a local Postgres instance running, launch one via Docker:
```powershell
docker run --name phishing-postgres -e POSTGRES_PASSWORD=9909 -e POSTGRES_DB=phishing_db -p 5432:5432 -d postgres
```

### Step 2: Configure Backend Environment
Create `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:9909@localhost/phishing_db
SECRET_KEY=generate-a-secure-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
VIRUSTOTAL_API_KEY=your_virustotal_key
GOOGLE_SAFE_BROWSING_API_KEY=your_google_safe_browsing_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Step 3: Run FastAPI Backend (Port 8001)
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8001
```

### Step 4: Run Next.js Frontend (Port 3000)
Create `.env.local` in the root folder:
```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8001
```
Install packages and start the Next.js dev server:
```powershell
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access Sentinel.

---

## 7. ☁️ Cloud Deployment Guide

Sentinel is fully production-ready and designed to deploy on Vercel and Render:

### Deploy the Backend & Database (on Render)
1. **Database**: Spin up a **PostgreSQL** instance on Render. Copy the **External Connection String**.
2. **Web Service**: Connect your GitHub repository to Render. 
   * **Name**: `sentinel-backend`
   * **Root Directory**: `backend`
   * **Runtime**: `Python 3`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   * **Environment Variables**: Add your `DATABASE_URL` (external connection string), `SECRET_KEY`, and API keys.

### Deploy the Frontend (on Vercel)
1. Import your GitHub repository into Vercel.
2. Select the **Root Directory** as `.` (the project root).
3. Under **Environment Variables**, add:
   * `NEXT_PUBLIC_API_BASE_URL` = (Your deployed Render backend URL, e.g., `https://sentinel-backend.onrender.com`)
4. Click **Deploy**. Vercel will build and host your Next.js frontend!
