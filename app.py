import os
from flask import Flask, render_template, request, session, redirect, url_for, flash
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash

if os.path.exists("env.py"):
    import env

# Instance of flask
app = Flask(__name__)

# Configure app with hidden variables
app.secret_key = os.environ.get("SECRET_KEY")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

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

    # If user is already signed in
    if session.get("user_id"):

        # Inform user that they've been redirected
        flash("You've been redirected to your feed as you're already signed in.", "success")

        # Redirect the user to the feed page
        return redirect(url_for("user.feed", user_email=session["user_email"]))
    
    else:

        # If an email has been entered
        if request.method == "POST":

            # Try searching db if entered email exists
            existing_user = mongo.db.users.find_one(
                    {"email": request.form.get("email").lower()})

            # If email does exist
            if existing_user:

                return redirect(url_for("password", user_email=existing_user["email"]))

            # If the email entered does not exist
            # redirect user to log in page & try again
            flash("The email address you entered doesn't exist. Please try again", "error")

            return redirect(url_for("log_in"))

            # Otherwise...
        else:

                # Render the log in page
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

                session["user_email"] = existing_user["email"]

                session["user_is_admin"] = existing_user["is_admin"]

                session["user_id"] = str(existing_user["_id"])

                # Redirect logged in user to feed page
                return redirect(url_for(
                        "user.feed", user_email=existing_user["email"]))
                
            # If not, redirect user to password page & inform user of error
            flash("The password attempt was wrong, please try again.", "error")
            
            return redirect(url_for("password", user_email=existing_user["email"]))
        
        # If a create password attempt has been made
        # Check both entered passwords are the same
        if request.form.get("password") == request.form.get("repeat_password"):

            # Create hashed password
            hashed_password = generate_password_hash(request.form.get("password"))

            # If so, try updating the password with the user's newly created one
            mongo.db.users.update_one({"_id": existing_user["_id"]}, {"$set": {"password": hashed_password}})

            # Add user info to current session
            session["user_email"] = existing_user["email"]

            session["user_is_admin"] = existing_user["is_admin"]

            session["user_id"] = str(existing_user["_id"])

            # Make the session permanent for 5 minutes
            session.permanent = True

            # Redirect logged in user to feed page
            return redirect(url_for(
                "user.feed", user_email=session["user_email"]))
        
        # Else if the passwords do not match
        elif request.form.get("password") != request.form.get("repeat_password"):

            # Inform the user of this
            flash("The passwords entered do not match, please try again.")

            # Redirect the user to create password page
            return redirect(url_for("password", user_email=existing_user["email"]))


    return render_template("password.html", existing_user=existing_user)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/log_out")
def log_out():
    # Remove current user session data
    session.pop("user_email")
    session.pop("user_is_admin")
    session.pop("user_id")

    # Inform the user they've been logged out at log in page
    flash("You have been logged out successfully", "success")
    
    # Redirect user to the log in page
    return redirect(url_for("log_in"))


@app.errorhandler(403)
def not_found(error):
    return render_template("403.html")


@app.errorhandler(404)
def not_found(error):
    return render_template("404.html")


@app.errorhandler(500)
def not_found(error):
    return render_template("500.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
