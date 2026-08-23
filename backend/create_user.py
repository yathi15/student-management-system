from app import app, db, User
from werkzeug.security import generate_password_hash


with app.app_context():

    username = "admin"
    password = "admin123"

    existing_user = User.query.filter_by(
        username=username
    ).first()

    if existing_user:
        print("User already exists!")

    else:
        hashed_password = generate_password_hash(password)

        new_user = User(
            username=username,
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        print("User created successfully!")
        print("Username: admin")
        print("Password: admin123")
