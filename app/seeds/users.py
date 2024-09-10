# seeds/users.py
"""Defines user seeds
Creates seed data in db based on seed_data.py
"""

from sqlalchemy.sql import text
from app.models import db, User, environment, SCHEMA
from .seed_data import users_list


def seed_users():
    """Seeds the user table"""
    for u in users_list:
        user = User(
            username=u["username"],
            email=u["email"],
            password=u["password"],
            # first_name=u["first_name"],
            # last_name=u["last_name"],
            # profile_image=u["profile_image"],
        )
        db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
