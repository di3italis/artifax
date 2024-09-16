# artifax_routes.py
"""Artifax Routes"""

# import os
from openai import OpenAI
from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from app.models import Artifax, db

# from .config import Config
from .utils import validate_string

client = OpenAI()
# openai.api_key = os.getenv("OPENAI_API_KEY")

artifax_routes = Blueprint("artifax", __name__)


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
    prompt = data.get("prompt")

    # Validation
    errors = {}
    if not title or not description or not prompt:
        errors["message"] = "Missing required fields"

    validate_string("prompt", data, errors)
    validate_string("title", data, errors)
    validate_string("description", data, errors)

    if errors:
        return {"errors": errors}, 400

    # Generate the image
    generated_image = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        n=1,
        size="1024x1024",
    )

    image = generated_image.data[0].url

    # Create a new artifax
    artifax = Artifax(
        title=title,
        description=description,
        image=image,
        owner_id=current_user.id,
    )

    db.session.add(artifax)
    db.session.commit()
    print(artifax.to_dict())
    return artifax.to_dict(), 201


@artifax_routes.route("/my-artifax", methods=["GET"])
@login_required
def user_artifax():
    """
    Query for all artifax by user id but ensure the logged-in user can only access their own artifax.
    """
    artifax = Artifax.query.filter_by(owner_id=current_user.id).all()

    return {"artifax": [fax.to_dict() for fax in artifax]}


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
