# models/__init__.py
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .artifax import Artifax
# from .comment import Comment

__all__ = [
    "User",
    "Artifax",
    # "Comment",
    "db",
    "environment",
    "SCHEMA",
    "add_prefix_for_prod",
]
