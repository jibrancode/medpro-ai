# MedPro AI — Automated Setup Script for Windows PowerShell
# Run this script from the project root: .\setup.ps1

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   MedPro AI — Automated Setup Script   " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Python
Write-Host "[1/5] Checking Python installation..." -ForegroundColor Yellow
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Python 3.10+ from https://python.org" -ForegroundColor Red
    exit 1
}
Write-Host "OK: $pythonVersion" -ForegroundColor Green

# Step 2: Install dependencies
Write-Host ""
Write-Host "[2/5] Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies." -ForegroundColor Red
    exit 1
}
Write-Host "OK: All dependencies installed." -ForegroundColor Green

# Step 3: Setup .env file
Write-Host ""
Write-Host "[3/5] Setting up environment variables..." -ForegroundColor Yellow
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "OK: Created .env from .env.example" -ForegroundColor Green
    Write-Host "IMPORTANT: Open .env and add your GEMINI_API_KEY before starting!" -ForegroundColor Yellow
} else {
    Write-Host "OK: .env file already exists. Skipping." -ForegroundColor Green
}

# Step 4: Initialize the database
Write-Host ""
Write-Host "[4/5] Initializing database..." -ForegroundColor Yellow
python setup_db.py
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Database setup may have failed. Check setup_db.py output above." -ForegroundColor Yellow
} else {
    Write-Host "OK: Database ready." -ForegroundColor Green
}

# Step 5: Instructions
Write-Host ""
Write-Host "[5/5] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "   HOW TO RUN MedPro AI                 " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 — Start the AI Backend:" -ForegroundColor White
Write-Host "  python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload" -ForegroundColor Green
Write-Host ""
Write-Host "Terminal 2 — Start the Frontend:" -ForegroundColor White
Write-Host "  cd frontend" -ForegroundColor Green
Write-Host "  python -m http.server 8080 --bind 127.0.0.1" -ForegroundColor Green
Write-Host ""
Write-Host "Then open your browser at: http://127.0.0.1:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Demo Login Credentials:" -ForegroundColor White
Write-Host "  User        -> user@test.com / user123" -ForegroundColor Gray
Write-Host "  Pharmacist  -> pharmacist / pharma123" -ForegroundColor Gray
Write-Host "  Admin       -> admin / admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
