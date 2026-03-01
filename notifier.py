import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

def send_email_notification(to_email, subject, message_body):
    """
    Sends an email notification using a Gmail SMTP server.
    Note: Requires a valid Gmail address and an 'App Password'.
    """
    # Configuration (Set these in your .env or replace here)
    sender_email = os.getenv("SMTP_EMAIL", "your-email@gmail.com")
    sender_password = os.getenv("SMTP_PASSWORD", "your-app-password")
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    # Create the email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(message_body, 'plain'))

    try:
        if not sender_email or "@" not in sender_email or sender_password == "your-app-password":
            return False, "SMTP configuration missing in .env (Check SMTP_EMAIL and SMTP_PASSWORD)"

        # Connect and send
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls() # Secure the connection
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, to_email, text)
        server.quit()
        print(f"✅ Notification email sent to {to_email}")
        return True, "OK"
    except smtplib.SMTPAuthenticationError:
        err = "Authentication failed. Check if SMTP_PASSWORD is a valid 16-character Google 'App Password'."
        print(f"❌ {err}")
        return False, err
    except Exception as e:
        err = str(e)
        print(f"❌ Failed to send email: {err}")
        return False, err

if __name__ == "__main__":
    # Example Usage:
    demo_email = "patient-email@example.com"
    demo_subject = "aMedPro: Order Confirmation"
    demo_msg = "Your order for Paracetamol 500mg has been confirmed. Thank you for choosing aMedPro!"
    
    print("Starting email notification service...")
    # Uncomment below to actually try sending (requires valid credentials)
    # send_email_notification(demo_email, demo_subject, demo_msg)
    print("Example program finished. Edit .env with SMTP_EMAIL and SMTP_PASSWORD to use.")
