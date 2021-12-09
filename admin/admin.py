from flask import Blueprint, render_template, redirect, request, url_for

admin = Blueprint("admin", __name__, static_folder="../static", template_folder="templates")

from app import mongo

@admin.route("/")
@admin.route("/manage")
def manage():
    return render_template("manage.html")


@admin.route("/create_user", methods=["GET", "POST"])
def create_user():

    # If an attempt to create a new user has been made
    if request.method == "POST":

        # Find if user already exists & store it
        user_exists = True if mongo.db.users.find_one(
            {"email": request.form.get("email")}) else False
        
        # If the user does exist
        if user_exists:
            # Redirect the user to the create user page
            return redirect(url_for("admin.create_user"))

        # Else if user does not currently exist
        # Store the new user info in a dictionary
        new_user = {
            "first_name": request.form.get("first_name"),
            "last_name": request.form.get("last_name"),
            "dob": request.form.get("dob"),
            "email": request.form.get("email"),
            "phone": request.form.get("phone"),
            "is_admin": bool(request.form.get("is_admin"))
        }

        # Insert the new user into the user db
        mongo.db.users.insert_one(new_user)

        return redirect(url_for("admin.manage"))

    return render_template("create_user.html")

@admin.route("/edit_user")
def edit_user():

    return render_template("edit_user.html")
