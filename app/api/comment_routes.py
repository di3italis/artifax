# comment_routes.py
"""Comment Routes"""

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Comment, Artifax, db
from .utils import validate_string

comment_routes = Blueprint("comments", __name__)


# --------------GET COMMENTS BY ARTIFAX ID--------------
@comment_routes.route("/<int:faxId>", methods=["GET"])
def get_comments(faxId):
    print(f"Fetching comments for artifax with ID: {faxId}")

    """
    Query for all comments associated with an artifax by artifax ID.
    """
    comments = Comment.query.filter_by(artifax_id=faxId).all()

    if not comments:
        return {"error": "No comments found for this artifax"}, 404

    return {"comments": [comment.to_dict() for comment in comments]}


# --------------CREATE A NEW COMMENT--------------
@comment_routes.route("/", methods=["POST"])
@login_required
def create_comment():
    """
    Create a new comment for an artifax.
    Data expected:
        text (required)
        artifax_id (required)
    """
    data = request.get_json()

    text = data.get("text")
    artifax_id = data.get("artifax_id")

    # Validation
    errors = {}
    validate_string("text", data, errors)

    if errors:
        return {"errors": errors}, 400

    # Check if the artifax exists
    artifax = Artifax.query.get(artifax_id)
    if not artifax:
        return {"error": "Artifax not found"}, 404

    # Create the comment
    comment = Comment(
        text=text,
        owner_id=current_user.id,
        artifax_id=artifax_id,
    )

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict(), 201


# --------------UPDATE COMMENT BY ID--------------
@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_comment(id):
    """
    Update a comment by its ID.
    """
    comment = Comment.query.get(id)

    if not comment:
        return {"error": "Comment not found"}, 404

    if comment.owner_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    data = request.get_json()

    text = data.get("text")

    # Validation
    errors = {}
    validate_string("text", data, errors)

    if errors:
        return {"errors": errors}, 400

    comment.text = text

    db.session.commit()

    return comment.to_dict(), 200


# --------------DELETE COMMENT BY ID--------------
@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):
    """
    Delete a comment by its ID.
    """
    comment = Comment.query.get(id)

    if not comment:
        return {"error": "Comment not found"}, 404

    if comment.owner_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    db.session.delete(comment)
    db.session.commit()

    return {"message": "Comment deleted successfully"}, 200
