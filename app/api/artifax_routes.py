# artifax_routes.py
"""Artifax Routes"""

import requests
from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from app.models import Artifax, db
from werkzeug.utils import secure_filename

# from .config import Config
from .utils import validate_string
import os

artifax_routes = Blueprint("artifax", __name__)


def allowed_file(filename):
    """Check if a file is allowed based on the extension."""
    allowed_extensions = current_app.config["ALLOWED_EXTENSIONS"]
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


@artifax_routes.route("/")
# @login_required
def artifax_get_all():
    """
    Query for all artifax and returns them in a list of artifax dictionaries
    """
    artifax = Artifax.query.all()
    return {"artifax": [fax.to_dict() for fax in artifax]}


@artifax_routes.route("/<int:id>")
# @login_required
def artifax_get_by_id(id):
    """
    Query for an artifax by id and returns that artifax in a dictionary
    """
    try:
        # Log the ID for debugging purposes
        print(f"Fetching artifax with ID: {id}")

        fax = Artifax.query.filter_by(id=id).first()
        if fax:
            return {"fax": fax.to_dict()}
        else:
            return {"error": "Artifax not found"}, 404
    except Exception as e:
        # Catch unexpected errors and return a JSON response
        return {"error": str(e)}, 500


@artifax_routes.route("/upload_image", methods=["POST"])
@login_required
def upload_image():
    print({"request_files": request.files})

    if "image" not in request.files:
        return {"error": "No image provided"}, 400

    image = request.file["image"]

    if image.filename == "":
        return {"error": "No selected file"}, 400

    if not allowed_file(image.filename):
        return {"error": "Invalid file type"}, 400

    # api_key = current_app.config["IMG_HIPPO_API_KEY"]
    api_key = "9W1YwT4VSelIHJyR3RYeKKmMlrGGiHJf"

    file = {"file": (image.filename, image, image.content_type)}
    data = {"api_key": api_key}

    try:
        #  Send the POST request to Imghippo API
        res = requests.post(
            "https://www.imghippo.com/v1/upload", file=image, api_key=api_key
        )
        res.raise_for_status()  # Raise an error for bad HTTP status codes
        response_data = res.json()
        return jsonify(response_data)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Image upload failed", "details": str(e)}), 500

    if res.status_code == 200:
        return jsonify(res.json())
    else:
        return jsonify({"error": "Image upload failed"}), res.status_code


@artifax_routes.route("/", methods=["POST"])
@login_required
def create_artifax():
    """
    Create a new artifax
    data expected:
        image (required)
        title (required)
        desciption (required)
    """

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    image = request.get("image")

    # Check if the post request has the file part
    if not title or not description or not image:
        return {"error": "Title, description, and image are required"}, 400

    # Validation
    errors = {}
    validate_string(title, "Title", errors)
    validate_string(description, "Description", errors)

    if errors:
        return {"errors": errors}, 400

    # Create a new artifax
    artifax = Artifax(
        title=title,
        description=description,
        image=image,
        owner_id=current_user.id,
    )

    db.session.add(artifax)
    db.session.commit()

    return jsonify(artifax.to_dict()), 201


@artifax_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def artifax_delete_by_id(id):
    """
    Delete an artifax by id
    """
    try:
        # Log the ID for debugging purposes
        print(f"Deleting artifax with ID: {id}")

        fax = Artifax.query.filter_by(id=id).first()

        if not fax:
            return {"error": "Artifax not found"}, 404

        if fax.owner_id != current_user.id:
            return {"error": "Unauthorized"}, 403

        db.session.delete(fax)
        db.session.commit()

        return {"message": "Artifax deleted successfully"}

    except Exception as e:
        # Catch unexpected errors and return a JSON response
        return {"error": str(e)}, 500
