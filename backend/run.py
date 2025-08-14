from flask import Flask
from flask_mail import Mail 
from auth.routes import auth_bp

from flask_cors import CORS
from config import Config 



app = Flask(__name__)
app.config.from_object(Config) 
CORS(app)


mail = Mail(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')


@app.route('/')
def index():
    return "Regal Wealth Advisors is running."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)