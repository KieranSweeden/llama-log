from flask import Blueprint, render_template


user = Blueprint("user", __name__, static_folder="../static", template_folder="templates")

@user.route("/")
@user.route("/feed")
def feed():
    return render_template("feed.html")


@user.route("/account")
def account():
    return render_template("account.html")