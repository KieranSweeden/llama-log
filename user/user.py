from flask import Blueprint, render_template,url_for

user = Blueprint("user", __name__, static_folder="../static", template_folder="templates")

import app

@user.route("/")
@user.route("/feed/<user_email>")
def feed(user_email):
    return render_template("feed.html", user_email=user_email)


@user.route("/account/<user_email>")
def account(user_email):

    current_user = app.mongo.db.users.find_one(
        {"email": user_email}
    )
    
    return render_template("account.html", current_user=current_user)
