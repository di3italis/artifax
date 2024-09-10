# seeds/artifax_seeder.py
from sqlalchemy.sql import text
from random import choice
from app.models import db, Artifax, environment, SCHEMA
from . import seed_data as sd


def seed_artifax():
    """Seed the artifax table with data"""

    for i in range(sd.num_artifax):
        print(f"Seeding artifax {i + 1} of {sd.num_artifax}")
        artifax = Artifax(
            owner_id=choice(range(1, len(sd.users_list) + 1)),
            image=choice(sd.artifax_img_urls),
            title=choice(sd.artifax_titles),
            description=choice(sd.artifax_descriptions),
        )
        db.session.add(artifax)
    db.session.commit()


def undo_artifax():
    """Undo the seeding of artifax table"""

    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.artifax RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artifax"))
    db.session.commit()
