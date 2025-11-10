from flask import Flask
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Import Blueprint จาก routes.py
    from app.routes import main_bp
    # จดทะเบียน Blueprint กับ app
    app.register_blueprint(main_bp)

    return app