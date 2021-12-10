import os
import ast
from flask import Flask, render_template, request, session, redirect, url_for
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


@app.route("/password", methods=["GET", "POST"])
@app.route("/password/<user_email>", methods=["GET", "POST"])
def password(user_email):

    # Find the user info via the entered email
    existing_user = mongo.db.users.find_one(
        {"email": user_email}) 

    # If a password attempt has been made
    if request.method == "POST":

        # If reset password is false
        if existing_user["password_is_reset"] == False:

            # Check if the entered password matches db password
            if check_password_hash(user_email.password, request.form.get("password")):

                # If so, add user info to current session
                session["user"] = request.form.get("email")

                # Make the session permanent for 5 minutes
                session.permanent = True

                # Redirect logged in user to feed page
                return redirect(url_for(
                        "user.feed", username=session["user"]))
                
            # If not, redirect user to log in page & try again
            return redirect(url_for("log_in"))
        
        # If a create password attempt has been made
        # Check both entered passwords are the same
        if request.form.get("password") == request.form.get("repeat_password"):

            # If so, add the password to the relevant doc in db
                
            # If so, add user info to current session
            session["user"] = request.form.get("email")

            # Make the session permanent for 5 minutes
            session.permanent = True

            # Redirect logged in user to feed page
            return redirect(url_for(
                "user.feed", username=session["user"]))


    return render_template("password.html", existing_user=existing_user)


@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/log_out")
def log_out():
    # Remove current user session data
    session.pop("user")
    # Redirect user to the log in page
    return redirect(url_for("log_in"))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
