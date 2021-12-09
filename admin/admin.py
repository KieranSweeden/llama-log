from flask import Blueprint, render_template, redirect, request


admin = Blueprint("admin", __name__, static_folder="../static", template_folder="templates")


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
            return redirect("create_user.html")


    return render_template("create_user.html")

@admin.route("/edit_user")
def edit_user():
    return render_template("edit_user.html")