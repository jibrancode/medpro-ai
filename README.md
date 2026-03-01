# 💊 MedPro AI — AI Pharmacist System

> **An intelligent, voice-enabled AI Pharmacist for the modern digital pharmacy.**  
> Built for Hackathon Phase 1 — Real-world AI Action, LLM Observability, and Smart Inventory Management.

---

## 🌟 Features

### 🤖 AI Pharmacist Agent
- **Gemini-powered Chat** — Talk to an AI pharmacist via text or 🎤 voice
- **Smart Medicine Search** — AI extracts medicine names from natural language
- **Prescription Detection** — Flags medicines that require Rx automatically
- **Quantity Selection** — Ask for "5 units" and the AI pre-fills your order
- **Real-world Tool Use** — The AI calls actual tools to update your database

### 📦 Inventory Management
- **User Store** — Highest stock shown first (best availability)
- **Pharmacist/Admin View** — Lowest stock shown first (refill priority)
- **Admin Refill Tool** — Quantity input + Refill button on every medicine card
- **Low Stock Alerts** — Auto-flagged when stock < 30 units

### 🔔 Notification System
- **Order Confirmations** — Users get notified after every successful order
- **Stock Updates** — Pharmacists & Admins notified in real-time
- **Persistent Logs** — Notifications saved via `localStorage` across sessions
- **Email Alerts** — Automated order confirmation via Gmail SMTP

### 📊 LLM Observability (Langfuse)
- Every AI conversation is **traced and logged** to Langfuse
- Input, output, latency, and metadata are all captured
- Helps with debugging, auditing, and optimizing the AI agent

### 🏪 Role-Based Dashboards
| Role | Dashboard Features |
|------|---|
| **User** | Medicine Store, AI Chat, Order History, Notifications |
| **Pharmacist** | Manage Inventory, Expiry Tracking, Available Stock, Prescription Queue |
| **Admin** | All Pharmacist features + Refill Tool, Inventory Analytics, Full Logs |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | FastAPI (Python) |
| **AI Model** | Google Gemini (`gemini-flash-latest`) |
| **Database** | SQLite (mock database via `index.db`) |
| **Observability** | Langfuse (LLM Tracing) |
| **Email** | Gmail SMTP via `smtplib` |
| **Voice** | Web Speech API (built into browser) |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Git
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)
- A [Langfuse Account](https://cloud.langfuse.com) (free)

### 1. Clone the Repository
```bash
git clone https://github.com/jibrancode/medpro-ai.git
cd medpro-ai
```

### 2. Run Automated Setup
```powershell
# Windows PowerShell
.\setup.ps1
```
OR manually follow the steps below.

### 3. Manual Setup

**Install Python dependencies:**
```bash
pip install -r requirements.txt
```

**Configure environment variables:**
```bash
# Rename the example env file
copy .env.example .env
```
Then open `.env` and fill in your keys.

**Initialize the database:**
```bash
python setup_db.py
```

**Start the backend server:**
```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

**Start the frontend server (new terminal):**
```bash
cd frontend
python -m http.server 8080 --bind 127.0.0.1
```

**Open the app:**
```
http://127.0.0.1:8080
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following:

```env
# === REQUIRED ===
GEMINI_API_KEY=your_gemini_api_key_here

# === OPTIONAL: Email Notifications ===
SMTP_EMAIL=your_gmail@gmail.com
SMTP_PASSWORD=your_16_char_app_password   # Requires Gmail App Password

# === OPTIONAL: Langfuse Observability ===
LANGFUSE_PUBLIC_KEY=pk-lf-xxxx
LANGFUSE_SECRET_KEY=sk-lf-xxxx
LANGFUSE_HOST=https://cloud.langfuse.com

# === OPTIONAL: Supabase (Future) ===
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

---

## 👤 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| User | `user@test.com` | `user123` |
| Pharmacist | `pharmacist` | `pharma123` |
| Admin | `admin` | `admin123` |

> You can also create your own account by clicking **"Create Account"**.

---

## 📁 Project Structure

```
medpro-ai/
├── main.py               # FastAPI app entry point
├── pharmacy_agent.py     # Gemini AI Agent + Langfuse tracing
├── db.py                 # Database operations + Tool functions
├── notifier.py           # Email notification service
├── setup_db.py           # Database initialization script
├── requirements.txt      # Python dependencies
├── setup.ps1             # PowerShell automated setup script
├── .env.example          # Environment variable template
├── .gitignore            # Git ignore rules
└── frontend/
    ├── index.html        # Main application HTML
    ├── style.css         # Application styles
    └── script.js         # Frontend logic & AI integration
```

---

## 🎯 Hackathon Requirements Met

| Requirement | Implementation |
|-------------|----------------|
| ✅ AI Agent with Tool Use | Gemini calls `check_stock` and `execute_action` tools |
| ✅ Real-world Database Updates | SQLite stock deducted on every order via `execute_action` |
| ✅ Mock Webhook Triggers | Email sent + webhook log on every order |
| ✅ Order Confirmation | Email + in-app notification after every purchase |
| ✅ LLM Observability | Full Langfuse tracing of every AI interaction |
| ✅ Voice Interface | Browser Web Speech API for input & output |
| ✅ Proactive Refill Alerts | Auto-generated alerts for stock < 30 units |

---

## 📸 Screenshots

> **Login Portal** → Role-based access for Users, Pharmacists, and Admins  
> **AI Chat** → Voice & text-enabled pharmacist assistant  
> **Medicine Store** → Sorted by availability, instant ordering  
> **Admin Dashboard** → Refill tool, inventory analytics, low-stock alerts  

---

## 📜 License

MIT License — feel free to fork and build on top of this!

---

*Built with ❤️ for HealthTech Hackathon Phase 1*
