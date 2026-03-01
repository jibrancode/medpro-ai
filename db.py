import sqlite3
import os
from notifier import send_email_notification

DB_FILE = os.path.join(os.path.dirname(__file__), "index.db")

# List of generic names or keywords that require a prescription
RX_REQUIRED_KEYWORDS = ["Antibiotic", "Steroid", "Opioid", "Ciprofloxacin", "Azithromycin", "Amoxicillin", "Metformin", "Losartan"]

def check_stock(query: str) -> str:
    """
    Search the database for medicines matching the query in their name or description.
    This can handle specific medicine names or symptoms (e.g., 'headache').
    
    Args:
        query: The medicine name or symptom to search for.
        
    Returns:
        A string representation of the matching medicines and their stock/prices.
    """
    if not os.path.exists(DB_FILE):
        return "Error: Database index.db not found."
        
    try:
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Search for query in name OR descriptions
        wildcard_query = f"%{query}%"
        
        cursor.execute('''
            SELECT product_name, price_rec, package_size, descriptions, stock 
            FROM medicines 
            WHERE product_name LIKE ? OR descriptions LIKE ?
            LIMIT 10
        ''', (wildcard_query, wildcard_query))
        
        rows = cursor.fetchall()
        conn.close()
        
        if not rows:
            return f"No medicines found matching '{query}'."
            
        results = []
        for i, row in enumerate(rows, 1):
            name = row['product_name']
            desc = row['descriptions']
            
            # Simple check for prescription
            needs_rx = any(kw.lower() in name.lower() or kw.lower() in desc.lower() for kw in RX_REQUIRED_KEYWORDS)
            rx_tag = "[PRESCRIPTION REQUIRED]" if needs_rx else "[NO PRESCRIPTION NEEDED]"
            
            results.append(
                f"{i}. {name} ({row['package_size']}): Stock {row['stock']} units. "
                f"Price: {row['price_rec']}. {rx_tag}"
            )
            
        return "I found the following medicines in stock:\n" + "\n".join(results) + "\n\nPlease tell me the number of the medicine you would like to order."
        
    except Exception as e:
        return f"Database error: {str(e)}"

def execute_action(action_type: str, med_name: str, quantity: int = 1, details: str = "") -> str:
    """
    Executes a real-world action such as updating the database for an order 
    or triggering a notification workflow.
    
    Args:
        action_type: The type of action ('order' or 'notify').
        med_name: The name of the medicine involved.
        quantity: The quantity to order (default 1).
        details: Additional details (e.g., patient name).
    """
    if not os.path.exists(DB_FILE):
        return "Error: Database not found."

    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        if action_type == 'order':
            # 1. Update Mock Database (Deduct Stock)
            cursor.execute("UPDATE medicines SET stock = stock - ? WHERE product_name LIKE ? AND stock >= ?", (quantity, f"%{med_name}%", quantity))
            
            if cursor.rowcount == 0:
                conn.close()
                return f"Action Failed: Could not find {med_name} with enough stock ({quantity} units) in the SQLite mock database."
            
            conn.commit()
            conn.close()
            
            # 2. Trigger Mock Webhook / Email Workflow (Project Requirement)
            email_status, email_msg = send_email_notification(
                to_email="patient@example.com", 
                subject=f"aMedPro: Real-world Action for {med_name}",
                message_body=f"This is an automated confirmation for your order of {quantity} units of {med_name}.\n\nThe AI Agent successfully executed a database stock deduction and triggered this email webhook."
            )
            
            webhook_log = f"WEBHOOK: Email result - {email_msg}"
            return f"SUCCESS: Action Executed. Stock for {med_name} (Qty: {quantity}) updated in SQLite database. {webhook_log}."
        
        elif action_type == 'notify':
            conn.close()
            print(f"WEBHOOK TRIGGERED: Notification sent for {med_name} - {details}")
            return f"SUCCESS: Notification workflow triggered for {med_name}."
            
        else:
            conn.close()
            return f"Error: Unknown action type '{action_type}'."
            
    except Exception as e:
        return f"Action execution error: {str(e)}"
