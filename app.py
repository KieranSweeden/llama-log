import os
from flask import Flask, render_template, request
from flask_pymongo import PyMongo

if os.path.exists("env.py"):
    import env

# Instance of flask
app = Flask(__name__)

# Configure app with hidden variables
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


# Instance of PyMongo, with flask app inserted as argument
# so Mongo DB can communicate with flask app
mongo = PyMongo(app)


@app.route("/")
def log_in():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/feed")
def feed():
    return render_template("feed.html")


@app.route("/account")
def account():
    return render_template("account.html")


@app.route("/manage")
def manage():
    return render_template("manage.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)