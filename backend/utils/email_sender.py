from flask_mail import Message
from flask import current_app

def send_2fa_code_email(user_email, code):
    """
    Sends the 2FA verification code to the user's email.
    """
    try:

        mail = current_app.extensions.get('mail')
        
        msg = Message(
            subject="Your Regal Wealth Advisors Verification Code",
            sender=("Regal Wealth Advisors", current_app.config['MAIL_USERNAME']),
            recipients=[user_email],
            body=f"Your two-factor authentication code is: {code}\n\nThis code will expire in 5 minutes."
        )
        mail.send(msg)
        return True
    except Exception as e:
 
        print(f"Error sending email: {e}")
        return False



