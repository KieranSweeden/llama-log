from flask import Blueprint, render_template


admin = Blueprint("admin", __name__, static_folder="static", template_folder="templates")


@admin.route("/")
@admin.route("/manage")
def manage():
    return render_template("manage.html")


@admin.route("/create_user")
def create_user():
    return render_template("create_user.html")

@admin.route("/edit_user")
def edit_user():
    return render_template("edit_user.html")