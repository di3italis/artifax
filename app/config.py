# config.py
import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    FLASK_RUN_PORT = os.environ.get("FLASK_RUN_PORT")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL").replace(
        "postgres://", "postgresql://"
    )
    SQLALCHEMY_ECHO = True

    # Flask-Uploads
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    UPLOAD_FOLDER = os.path.join(basedir, "uploads")

    # set max upload size to 16MB
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024

    # img hippo api
    IMG_HIPPO_API_KEY = os.environ.get("IMG_HIPPO_API_KEY")

    # openai api
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
