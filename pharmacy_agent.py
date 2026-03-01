import os
import google.generativeai as genai
from dotenv import load_dotenv
from db import check_stock, execute_action

# Load environment variables from .env file
load_dotenv()

# Get API key from environment
api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    genai.configure(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY not found. Please set it in .env file.")

# Define the system instructions for the agent
system_instruction = """
You are the AI Pharmacist Agent (aMedPro). Your job is to help users find medicines, check stock, and guide them through the ordering process.

WORKFLOW:
1. SEARCH: Use the check_stock tool to find medicines. 
2. ENLIST: When you present results, Always number them sequentially (1, 2, 3, 4...).
3. SELECTION: If the user replies with a number (e.g., 'I want number 2'), look back at the previous list you provided to identify which medicine they selected.
4. PRESCRIPTION & QUANTITY CHECK:
   - Check if the selected medicine has '[PRESCRIPTION REQUIRED]'.
   - If it does, ask: 'This medicine requires a validated prescription. Do you have one?'
   - If the user confirms (or no Rx needed), you MUST ask: 'How many units (quantity) would you like to order?'
   - Once you have the quantity, proceed to the ORDERING PHASE.
5. ORDERING PHASE & ACTION:
   - Tell the user you are opening the order dashboard.
   - EXECUTE ACTION (Required): You MUST call the 'execute_action' tool with action_type='order', med_name={NAME}, and quantity={QTY}.
   - TRIGGER FRONTEND: Append this EXACT hidden string to your final response: 
     ||ORDER_DATA|{MED_NAME}|{PRICE}|{QTY}|{NEEDS_RX_BOOL}||
     Replace {MED_NAME} with the product name, {PRICE} with the price, {QTY} with the requested amount, and {NEEDS_RX_BOOL} with 'true' or 'false'.

Rules:
- Do not hallucinate stock levels.
- Be professional and helpful.
- If the user mentions symptoms, search for relevant categories.
"""


# Initialize the model with the tool and system instructions
if api_key:
    model = genai.GenerativeModel(
        model_name="gemini-flash-latest",
        tools=[check_stock, execute_action],
        system_instruction=system_instruction
    )
    # Start a chat session with automatic function calling enabled
    # This automatically executes the python function and returns the result to the model
    chat_session = model.start_chat(enable_automatic_function_calling=True)
else:
    model = None
    chat_session = None

def chat_with_agent(user_message: str) -> str:
    """
    Sends the user message to the Gemini AI Agent. 
    The Agent can automatically use the check_stock tool if needed.
    """
    if not chat_session:
        return "Error: Gemini API key is missing. Please check your .env file."
        
    try:
        response = chat_session.send_message(user_message)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        if "429" in str(e):
            return "The AI is currently receiving too many requests. Please wait a moment and try again."
        return f"I apologize, but I am having trouble processing your request right now ({str(e)[:50]}...)"
