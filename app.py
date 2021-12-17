import os
from flask import Flask, render_template, request, session, redirect, url_for, flash
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

if os.path.exists("env.py"):
    import env

# Instance of flask
app = Flask(__name__)

# Configure app with hidden variables
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

# Set 5 minute session time limit
app.permanent_session_lifetime = timedelta(minutes=5)


from user.user import user
from admin.admin import admin


# Register blueprints with app
app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(admin, url_prefix="/admin")


# Instance of PyMongo, with flask app inserted as argument
# so Mongo DB can communicate with flask app
mongo = PyMongo(app)


@app.route("/")
@app.route("/log_in", methods=["GET", "POST"])
def log_in():
    # If an email has been entered
    if request.method == "POST":

        # Search db if entered email exists
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})

        # If email does exist
        if existing_user:

            return redirect(url_for("password", user_email=existing_user["email"]))
            

        # If the email entered does not exist
        # redirect user to log in page & try again
            return redirect(url_for("log_in"))

    return render_template("index.html")


@app.route("/password/<user_email>", methods=["GET", "POST"])
def password(user_email):

    # Find the user info via the entered email
    existing_user = mongo.db.users.find_one(
        {"email": user_email}) 

    # If a password attempt has been made
    if request.method == "POST":

        # If the password isn't set to none
        if existing_user["password"] != "none":

            # Check if the entered password matches db password
            if check_password_hash(existing_user["password"], request.form.get("password")):

                # If so, add user info to current session
                session["user_email"] = user_email

                session["user_is_admin"] = existing_user["is_admin"]

                session["user_id"] = str(existing_user["_id"])

                # Make the session permanent for 5 minutes
                session.permanent = True

                # Redirect logged in user to feed page
                return redirect(url_for(
                        "user.feed", user_email=session["user_email"]))
                
            # If not, redirect user to log in page & try again
            return redirect(url_for("log_in"))
        
        print("is true")
        
        # If a create password attempt has been made
        # Check both entered passwords are the same
        if request.form.get("password") == request.form.get("repeat_password"):

            # Create hashed password
            hashed_password = generate_password_hash(request.form.get("password"))

            # If so, reset the password to the relevant doc in db
            mongo.db.users.update_one({"_id": existing_user["_id"]}, {"$set": {"password": hashed_password}})

            # Add user info to current session
            session["user_email"] = existing_user["email"]

            session["user_is_admin"] = existing_user["is_admin"]

            # Make the session permanent for 5 minutes
            session.permanent = True

            # Redirect logged in user to feed page
            return redirect(url_for(
                "user.feed", user_email=session["user_email"]))


    return render_template("password.html", existing_user=existing_user)


@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/log_out")
def log_out():
    # Remove current user session data
    session.pop("user_email")
    session.pop("user_is_admin")

    # Inform the user they've been logged out at log in page
    flash("You have been logged out successfully")
    
    # Redirect user to the log in page
    return redirect(url_for("log_in"))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
