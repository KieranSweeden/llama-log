from flask import Blueprint, render_template, url_for, request, flash, redirect, session

user = Blueprint("user", __name__, static_folder="../static", template_folder="templates")

import app

@user.route("/")
@user.route("/feed/<user_email>")
def feed(user_email):
    return render_template("feed.html", user_email=user_email)


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
