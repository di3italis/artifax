# artifax_routes.py
"""Artifax Routes"""

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Artifax, db
# from .utils import validate_str

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


# @artifax_routes.route("/", methods=["POST"])
# @login_required
# def create_artifax():
#     """
#     Create a new artifax
#     """
#     data = request.json
#     errors = {}
#     validate
#     artifax = Artifax(
#         image=data["image"],
#         title=data["title"],
#         description=data["description"],
#         owner_id=data["owner_id"],
#     )
#     db.session.add(artifax)
#     db.session.commit()
#     return artifax.to_dict()
