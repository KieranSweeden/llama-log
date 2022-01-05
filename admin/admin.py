from flask import Blueprint, render_template, redirect, request, url_for, flash, session, abort
from flask_pymongo import ObjectId
from ast import literal_eval

admin = Blueprint("admin", __name__, static_folder="../static", template_folder="templates")

import app

@admin.route("/")
@admin.route("/manage")
def manage():

    # If the current user is not an admin
    if session["user_is_admin"] is not True:

        # Abort & present user with forbidden reasoning
        abort(403)

    else:
        # Obtain all users from user database
        users = list(app.mongo.db.users.find())

        # Get deleted user profile
        deleted_user = app.mongo.db.users.find_one(
            {"_id": ObjectId("61cabfd85c981958c32d009d")}
        )

        # Get current user profile
        current_user = app.mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}
        )

        # Remove deleted user & current user account from list of users
        users.remove(deleted_user)
        users.remove(current_user)

        # Render manage page displaying users excluding current user & deleted user
        return render_template("manage.html", users=users)


@admin.route("/create_user", defaults={"previous": None}, methods=["GET", "POST"])
@admin.route("/create_user/<previous>", methods=["GET", "POST"])
def create_user(previous):

    # If the current user is not an admin
    if session["user_is_admin"] is not True:

        # Abort & present user with forbidden reasoning
        abort(403)

    else:
        # If an attempt to create a new user has been made
        if request.method == "POST":

            # Find if user already exists & store it
            user_exists = True if app.mongo.db.users.find_one(
                {"email": request.form.get("email")}) else False
            
            # If the user does exist
            if user_exists:
                
                # Grab previously entered data
                previous = {
                    "first_name": request.form.get("first_name"),
                    "last_name": request.form.get("last_name"),
                    "dob": request.form.get("dob"),
                    "phone": request.form.get("phone"),
                    "is_admin": bool("is_admin" in request.form)
                }

                # Inform admin that user already exists
                flash("This email is already in use, please create a different one.", "error")

                # Redirect the user to the create user page
                return redirect(url_for("admin.create_user", previous=previous))

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
            flash(f"{new_user['first_name']}'s profile has been created successfully", "success")

            # Redirect the user to the manage page
            return redirect(url_for("admin.manage"))
        
        # If a previous attempt was made
        if(previous):

            # Convert string to dictionary to send to template
            previous_dict = ast.literal_eval(previous)
            
            # Render template with previously inserted info
            return render_template("create_user.html", previous=previous_dict)
        
        else:
            # Render template with previously entered info left undefined
            return render_template("create_user.html", previous=previous)

@admin.route("/edit_user/<user_id>", methods=["GET", "POST"])
def edit_user(user_id):

    # If the current user is not an admin
    if session["user_is_admin"] is not True:

        # Abort & present user with forbidden reasoning
        abort(403)
    
    else:
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

            flash("User has been updated successfully", "success")

            # Redirect the user to the manage users page
            return redirect(url_for("admin.manage"))

        # Else open the edit user template & send user data
        return render_template("edit_user.html", displayed_user=displayed_user)


@admin.route("/delete_user/<user_id>")
def delete_user(user_id):

    # If the current user is not an admin
    if session["user_is_admin"] is not True:

        # Abort & present user with forbidden reasoning
        abort(403)
    
    else:
        # Grab the user from db using the user_id
        clicked_user = app.mongo.db.users.find_one(
            {"_id": ObjectId(user_id)}
        )

        # Delete user from users db
        app.mongo.db.users.delete_one({"_id": ObjectId(user_id)})

        # Grab deleted user account from db
        default_deleted_user = app.mongo.db.users.find_one(
            {"first_name": "Deleted"}
        )

        # Replace work order posts user is author of to deleted user
        app.mongo.db.work_orders.update_many(
            {"author": ObjectId(user_id)},
            {"$set": {
                "author": default_deleted_user["_id"]
            }}
        )

        # Replace incident posts user is author of to deleted user
        app.mongo.db.incidents.update_many(
            {"author": ObjectId(user_id)},
            {"$set": {
                "author": default_deleted_user["_id"]
            }}
        )

        # Replace comments user is author to deleted user
        app.mongo.db.comments.update_many(
            {"author": ObjectId(user_id)},
            {"$set": {
                "author": default_deleted_user["_id"]
            }}
        )

        # Inform admin of user deletion
        flash(f"{clicked_user['first_name']}'s account has been successfully deleted", "success")

        # Return to admin manage page
        return redirect(url_for("admin.manage"))


@admin.route("/reset_password/<user_id>")
def reset_password(user_id):

    # If the current user is not an admin
    if session["user_is_admin"] is not True:

        # Abort & present user with forbidden reasoning
        abort(403)
    
    else:
        # Grab the user from db using the user_id
        clicked_user = app.mongo.db.users.find_one(
            {"_id": ObjectId(user_id)}
        )

        # Reset clicked user's password in db
        app.mongo.db.users.update_one({"_id": clicked_user["_id"]}, {"$set": {"password": None}})

        # Inform admin of clicked user's password deletion
        flash(f"{clicked_user['first_name']}'s password has been reset", "success")

        # Return to admin manage page
        return redirect(url_for("admin.manage"))
