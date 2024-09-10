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
    return {"artifax": [artifax.to_dict() for artifax in artifax]}


@artifax_routes.route("/<int:id>")
# @login_required
def artifax_get_by_id(id):
    """
    Query for a artifax by id and returns that artifax in a dictionary
    """
    # this may not work->
    artifax = Artifax.query.get(id)
    return artifax.to_dict() if artifax else {"error": "Artifax not found"}, 404


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
