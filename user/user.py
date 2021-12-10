from flask import Blueprint, render_template


user = Blueprint("user", __name__, static_folder="../static", template_folder="templates")

@user.route("/")
@user.route("/feed/<user_email>")
def feed(user_email):
    return render_template("feed.html", user_email=user_email)


@user.route("/account")
def account():
    return render_template("account.html")