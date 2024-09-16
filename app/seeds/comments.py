# seedscomments.py
from sqlalchemy.sql import text
from random import sample, choice
from app.models import db, Comment, environment, SCHEMA
from . import seed_data as sd


def seed_comments():
    """Seed the comments table with data"""

    comments = sample(sd.comments_list, sd.num_artifax)

    for i in range(sd.num_artifax):
        print(f"Seeding comment {i + 1} of {sd.num_artifax}")
        comment = Comment(
            owner_id=choice(range(1, len(sd.users_list) + 1)),
            artifax_id=i + 1,
            text=comments[i],
        )
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    """Undo the seeding of comments table"""

    if environment == "production":
        db.session.execute(
            f"TRUNCATE TABLE {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
