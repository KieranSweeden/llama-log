from flask import Blueprint, render_template, url_for, request, flash, redirect, session

user = Blueprint("user", __name__, static_folder="../static", template_folder="templates")

import app


@user.route("/feed/<user_email>")
def feed(user_email):
    return render_template("feed.html", user_email=user_email)


@user.route("/create_post/<category>", methods=["POST", "GET"])
def create_post(category):

    # If the user makes a post submission
    if request.method == "POST":

        # Determine whether it's a word order or incident
        if category == "work_order":
            
            # Gather up the submitted data into a dict
            new_work_order = {
                "title": request.form.get("title"),
                "equipment": request.form.get("equipment"),
                "description": request.form.get("description")
            }

            # Push new work order post to database

            app.mongo.db.work_orders.insert_one(new_work_order)

            return redirect(url_for("user.feed", user_email=session["user_email"]))


    return render_template("create_post.html", category=category)


@user.route("/account/<user_email>", methods=["POST", "GET"])
def account(user_email):

    current_user = app.mongo.db.users.find_one(
        {"email": user_email}
    )

    if request.method == "POST":

        # Get the user info from the form
        updated_user_info = {
            "first_name": request.form.get("first_name"),
            "last_name": request.form.get("last_name"),
            "dob": request.form.get("dob"),
            "email": request.form.get("email"),
            "phone": request.form.get("phone"),
            "is_admin": current_user["is_admin"]
        }

        # Update the user info in db with new info submitted
        app.mongo.db.users.update_one({"_id": current_user["_id"]}, {"$set": updated_user_info})

        flash("Your account has been updated successfully!")

        # Redirect the user to the manage users page
        return redirect(url_for("user.account", user_email=session["user_email"]))
    
    return render_template("account.html", current_user=current_user)
