# models/artifax.py
"""Model definitions"""

from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Artifax(db.Model):
    """Describes the Artifax table"""

    __tablename__ = "artifax"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(1000), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    # price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow()
    )

    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    owner = db.relationship("User", back_populates="artifax")

    # labels = relationship("Label", back_populates="artifax")
    # likes = relationship("Review", back_populates="artifax")
    comments = db.relationship(
        "Comment", back_populates="artifax", cascade="all, delete-orphan"
    )

    def to_dict(self):
        """Return a dictionary representation of the object"""
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "username": self.owner.username,
            "image": self.image,
            "title": self.title,
            "description": self.description,
            # "price": self.price,
            "created_at": self.created_at.strftime("%y%m%d:%H%M%S")
            if self.created_at
            else None,
            "updated_at": self.updated_at.strftime("%y%m%d:%H%M%S")
            if self.updated_at
            else None,
            # "labels": [label.to_dict() for label in self.labels],
            # "likes": [like.to_dict() for like in self.likes],
            "comments": [comment.to_dict() for comment in self.comments],
        }
