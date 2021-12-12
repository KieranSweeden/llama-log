from flask import Blueprint, render_template, redirect, request, url_for, flash
from flask_pymongo import ObjectId

admin = Blueprint("admin", __name__, static_folder="../static", template_folder="templates")

import app

@admin.route("/")
@admin.route("/manage")
def manage():

    users = app.mongo.db.users.find()

    return render_template("manage.html", users=users)


@admin.route("/create_user", methods=["GET", "POST"])
def create_user():

    # If an attempt to create a new user has been made
    if request.method == "POST":

        # Find if user already exists & store it
        user_exists = True if app.mongo.db.users.find_one(
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
            "is_admin": bool("is_admin" in request.form),
            "password": "none"
        }

        # Insert the new user into the user db
        app.mongo.db.users.insert_one(new_user)

        # Inform admin that new user has been created
        flash("New user has been created successfully")

        # Redirect the user to the manage page
        return redirect(url_for("admin.manage"))

    return render_template("create_user.html")

@admin.route("/edit_user/<user_id>", methods=["GET", "POST"])
def edit_user(user_id):

    # Grab the user from db using the user_email
    displayed_user = app.mongo.db.users.find_one(
        {"_id": ObjectId(user_id)}
    )

    # If an attempt is made to update a user
    if request.method == "POST":

        # Get the user info from the form
        updated_user_info = {
            "first_name": request.form.get("first_name"),
            "last_name": request.form.get("last_name"),
            "dob": request.form.get("dob"),
            "email": request.form.get("email"),
            "phone": request.form.get("phone"),
            "is_admin": bool("is_admin" in request.form)
        }

        # Update the user info in db with new info submitted
        app.mongo.db.users.update_one({"_id": displayed_user["_id"]}, {"$set": updated_user_info})

        flash("User has been updated successfully")

        # Redirect the user to the manage users page
        return redirect(url_for("admin.manage"))

    # Else open the edit user template & send user data
    return render_template("edit_user.html", displayed_user=displayed_user)


@admin.route("/delete_user/<user_id>")
def delete_user(user_id):

    # Grab the user from db using the user_id
    clicked_user = app.mongo.db.users.find_one(
        {"_id": ObjectId(user_id)}
    )

    # Reset clicked user's password in db
    app.mongo.db.users.delete_one({"_id": ObjectId(user_id)})

    # Inform admin of user deletion
    flash(f"{clicked_user['first_name']}'s account has been successfully deleted")

    # Return to admin manage page
    return redirect(url_for("admin.manage"))



@admin.route("/reset_password/<user_id>")
def reset_password(user_id):

    # Grab the user from db using the user_id
    clicked_user = app.mongo.db.users.find_one(
        {"_id": ObjectId(user_id)}
    )

    # Reset clicked user's password in db
    app.mongo.db.users.update_one({"_id": clicked_user["_id"]}, {"$set": {"password": None}})

    # Inform admin of clicked user's password deletion
    flash(f"{clicked_user['first_name']}'s password has been reset")

    # Return to admin manage page
    return redirect(url_for("admin.manage"))
