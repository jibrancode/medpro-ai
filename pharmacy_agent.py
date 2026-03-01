import os
import google.generativeai as genai
from dotenv import load_dotenv
from db import check_stock, execute_action

# Load environment variables from .env file
load_dotenv()

# --- Langfuse Observability Setup ---
try:
    from langfuse import Langfuse
    langfuse_client = Langfuse(
        public_key=os.getenv("LANGFUSE_PUBLIC_KEY"),
        secret_key=os.getenv("LANGFUSE_SECRET_KEY"),
        host=os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")
    )
    LANGFUSE_ENABLED = True
    print("Langfuse Observability: ENABLED")
except Exception as e:
    langfuse_client = None
    LANGFUSE_ENABLED = False
    print(f"Langfuse Observability: DISABLED ({e})")

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
    chat_session = model.start_chat(enable_automatic_function_calling=True)
else:
    model = None
    chat_session = None


def chat_with_agent(user_message: str) -> str:
    """
    Sends the user message to the Gemini AI Agent, with Langfuse tracing.
    """
    if not chat_session:
        return "Error: Gemini API key is missing. Please check your .env file."

    # Start a Langfuse trace for this interaction
    trace = None
    if LANGFUSE_ENABLED:
        try:
            trace = langfuse_client.trace(
                name="PharmacyAgentChat",
                input=user_message,
                metadata={"model": "gemini-flash-latest", "app": "aMedPro"}
            )
        except Exception:
            trace = None

    try:
        response = chat_session.send_message(user_message)
        result = response.text

        # Log the output to Langfuse
        if trace:
            trace.update(output=result)
            langfuse_client.flush()

        return result

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        if trace:
            trace.update(output=f"Error: {str(e)}")
        if "429" in str(e):
            return "The AI is currently receiving too many requests. Please wait a moment and try again."
        return f"I apologize, but I am having trouble processing your request right now ({str(e)[:50]}...)"
