from flask import Blueprint, render_template


user = Blueprint("user", __name__, static_folder="../static", template_folder="templates")

@user.route("/")
@user.route("/feed<username>")
def feed(username):
    return render_template("feed.html", username=username)


@user.route("/account")
def account():
    return render_template("account.html")