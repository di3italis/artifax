# seeds/artifax_seeder.py
from sqlalchemy.sql import text
from random import sample, choice
from app.models import db, Artifax, environment, SCHEMA
from . import seed_data as sd


def seed_artifax():
    """Seed the artifax table with data"""

    img_urls = sample(sd.artifax_img_urls, sd.num_artifax)
    titles = sample(sd.artifax_titles, sd.num_artifax)
    descriptions = sample(sd.artifax_descriptions, sd.num_artifax)

    for i in range(sd.num_artifax):
        print(f"Seeding artifax {i + 1} of {sd.num_artifax}")
        artifax = Artifax(
            owner_id=choice(range(1, len(sd.users_list) + 1)),
            image=img_urls[i],
            title=titles[i],
            description=descriptions[i],
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
