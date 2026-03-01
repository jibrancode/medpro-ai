import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("No API key found!")
    exit(1)

genai.configure(api_key=api_key)
print(f"Using API key: {api_key[:5]}...{api_key[-5:]}")

try:
    print("Listing available models...")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")

    print("Attempting to generate content with 'gemini-2.0-flash'...")
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content("Hello")
    print(f"Response: {response.text}")
except Exception as e:
    import traceback
    print(f"Detailed Error: {e}")
    traceback.print_exc()
