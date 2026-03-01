from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pharmacy_agent import chat_with_agent
from notifier import send_email_notification

app = FastAPI(title="AI Pharmacist System - Phase 1")

# Add CORS middleware to allow the frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=False, # Set to False when using allow_origins=["*"] to avoid browser errors
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    """
    Chat endpoint to interact with the AI Pharmacist Agent.
    """
    print(f"User: {request.message}")
    
    # Let the Gemini Agent handle the response, including tool calls to the database if needed
    agent_response = chat_with_agent(request.message)
    
    print(f"Agent: {agent_response}")
    
    return ChatResponse(response=agent_response)

class EmailRequest(BaseModel):
    to_email: str
    subject: str
    message: str

@app.post("/send-email")
def send_email_endpoint(request: EmailRequest):
    """
    Endpoint to send an email notification.
    """
    success, result_message = send_email_notification(request.to_email, request.subject, request.message)
    if success:
        return {"status": "success", "message": "Email sent successfully"}
    else:
        return {"status": "error", "message": result_message}

# To run the server:
# uvicorn main:app --reload
