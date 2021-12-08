import os
from flask import Flask, render_template, request, session, redirect, url_for
from flask_pymongo import PyMongo
from user.user import user
from admin.admin import admin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

if os.path.exists("env.py"):
    import env

# Instance of flask
app = Flask(__name__)

# Register blueprints with app
app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(admin, url_prefix="/admin")

# Set 5 minute session time limit
app.permanent_session_lifetime = timedelta(minutes=5)

# Configure app with hidden variables
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


# Instance of PyMongo, with flask app inserted as argument
# so Mongo DB can communicate with flask app
mongo = PyMongo(app)


@app.route("/")
@app.route("/log_in", methods=["GET", "POST"])
def log_in():
    # If a log in attempt has been made
    if request.method == "POST":

        # Search db if entered email exists
        existing_user = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})

        # If email does exist
        if existing_user:

            # Check if the passwords match
            if check_password_hash(existing_user["password"], request.form.get("password")):

                # If so, add user info to current session
                session["user"] = request.form.get("email")

                # Make the session permanent for 5 minutes
                session.permanent = True

                # Redirect logged in user to feed page
                return redirect(url_for(
                        "user.feed", username=session["user"]))
                
            else:
                # If not, redirect user to log in page & try again
                return redirect(url_for("log_in"))

        # If the email entered does not exist
        elif not existing_user:

            # redirect user to log in page & try again
            return redirect(url_for("log_in"))

    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/logout")
def log_out():
    # Remove current user session data
    session.pop("user")
    # Redirect user to the log in page
    return redirect(url_for("log_in"))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
