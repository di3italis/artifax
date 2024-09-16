from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    """Describes the Comment table"""

    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow()
    )

    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    username = db.relationship("User")
    artifax_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("artifax.id")))
    artifax = db.relationship("Artifax", back_populates="comments")

    def to_dict(self):
        """Return a dictionary representation of the object"""
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "username": self.username.username,
            "artifax_id": self.artifax_id,
            "text": self.text,
            "created_at": self.created_at.strftime("%y%m%d:%H%M%S")
            if self.created_at
            else None,
            "updated_at": self.updated_at.strftime("%y%m%d:%H%M%S")
            if self.updated_at
            else None,
        }
