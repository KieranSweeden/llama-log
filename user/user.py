from flask import Blueprint, render_template, url_for, request, flash, redirect, session
from flask_pymongo import ObjectId
import datetime

user = Blueprint("user", __name__, static_folder="../static", template_folder="templates")

import app


@user.route("/feed/<user_email>")
def feed(user_email):

    # Retrieve work orders & incidents
    work_orders = list(app.mongo.db.work_orders.find())
    incidents = list(app.mongo.db.incidents.find())

    # Combine both into single list
    posts = work_orders + incidents

    # Sort by date
    posts.sort(reverse=True, key=sort_by_date_created)

    # For each post
    for post in posts:

        # Grab the name of the author and add it to post dict
        author_of_post = app.mongo.db.users.find_one({"_id": ObjectId(post["author"])})
        post["author_name"] = str(author_of_post["first_name"] + " " + author_of_post["last_name"])
        post["author_id"] = str(post["author"])

        # Search the comments to see if any comments are linked to post
        post_comments = list(app.mongo.db.comments.find(
            {"parent_post_id": post["_id"]}
        ))

        # Set amount of comments to length of obtained comments
        post["amount_of_comments"] = len(post_comments)

    # render templates sending the posts
    return render_template("feed.html", user_email=user_email, posts=posts)


def sort_by_date_created(post):
    return post['date_created']


@user.route("/create_post/<category>", methods=["POST", "GET"])
def create_post(category):

    # If the user makes a post submission
    if request.method == "POST":

        # If the submission made is a work order
        if category == "work_order":
            
            # Gather up the submitted data into a dict
            new_work_order = {
                "title": request.form.get("title"),
                "equipment": request.form.get("equipment"),
                "description": request.form.get("description"),
                "date_created": datetime.datetime.now(),
                "author": ObjectId(session["user_id"])
            }

            # Push new work order post to database
            app.mongo.db.work_orders.insert_one(new_work_order)

            # Inform user that a post has been submitted successfully
            flash("Your new work order has been successfully posted")

            # Redirect user to the feed page
            return redirect(url_for("user.feed", user_email=session["user_email"]))

        # Else if it's an incident
        else:

            # If a customer was involved
            if ("customer_name" in request.form):

                # Gather submitted data (with customer data) into dict
                new_incident = {
                    "title": request.form.get("title"),
                    "customer_name": request.form.get("customer_name"),
                    "customer_phone": request.form.get("customer_phone"),
                    "description": request.form.get("description"),
                    "date_created": datetime.datetime.now(),
                    "author": ObjectId(session["user_id"])
                }

            # Else if a customer wasn't involved
            else:

                # Gather submitted data (without customer data) into dict
                new_incident = {
                    "title": request.form.get("title"),
                    "description": request.form.get("description"),
                    "date_created": datetime.datetime.now(),
                    "author": ObjectId(session["user_id"])
                }

            # Push new incident to database
            app.mongo.db.incidents.insert_one(new_incident)

            # Inform user that an incident post has been submitted successfully
            flash("Your new incident post has been successfully posted")

            # Redirect user to the feed page
            return redirect(url_for("user.feed", user_email=session["user_email"]))

    # If no form submission has been made, render the create post page
    return render_template("create_post.html", category=category)


@user.route("/view_post/<post_id>", methods=["POST", "GET"])
def view_post(post_id):

    # If a comment submission has been made
    if request.method == "POST":

        # Gather the comment data
        new_comment = {
            "content": request.form.get("content"),
            "parent_post_id": ObjectId(post_id),
            "date_created": datetime.datetime.now(),
            "author": ObjectId(session["user_id"])
        }

        # Push new comment data to comment db
        app.mongo.db.comments.insert_one(new_comment)

        # Inform user that comment has been successfully posted
        flash("Your comment has been successfully posted")
        
        # Redirect user to view post with new comment showing
        return redirect(url_for("user.view_post", post_id=post_id))

    # Using post ObjectId, get full post from work order db
    current_post = app.mongo.db.work_orders.find_one(
        {"_id": ObjectId(post_id)}
    )

    # If post not work order, check the incidents db
    if current_post == None:
        current_post = app.mongo.db.incidents.find_one(
        {"_id": ObjectId(post_id)}
    )

    # Retrieve comments related to post
    post_comments = list(app.mongo.db.comments.find(
        {"parent_post_id": ObjectId(post_id)}
    ))

    # Calculate amount of comments linked to post
    current_post["amount_of_comments"] = len(post_comments)

    # Get user names for comments using author ID's
    for post_comment in post_comments:

        # Grab user from db
        author = app.mongo.db.users.find_one(
            {"_id": ObjectId(post_comment["author"])}
        )

        # Add author name to post comment using author values
        post_comment["author_name"] = f"{author['first_name']} {author['last_name']}"

        # Convert author ID to string to use for comparison within page
        post_comment["author"] = str(post_comment["author"])


    # Get name from user db using the post author Id
    author_of_post = app.mongo.db.users.find_one({"_id": ObjectId(current_post["author"])})
    current_post["author_name"] = str(author_of_post["first_name"] + " " + author_of_post["last_name"])
    current_post["author_id"] = str(current_post["author"])

    # Render view post template with fetched current post data
    return render_template("view_post.html", post=current_post, post_comments=post_comments)


@user.route("/edit_post/<post_id>", methods=["POST", "GET"])
def edit_post(post_id):

    # If an update submission has been made
    if request.method == "POST":

        # If it's a work order
        if "equipment" in request.form:
            
            # Gather updated data into dict
            updated_work_order = {
                "title": request.form.get("title"),
                "equipment": request.form.get("equipment"),
                "description": request.form.get("description"),
                "date_created": datetime.datetime.now(),
                "author": ObjectId(session["user_id"])
            }

            # Update original document in work order db
            app.mongo.db.work_orders.update_one(
                {"_id": ObjectId(post_id)}, 
                {"$set": updated_work_order})

            # Inform user that post has been updated
            flash("It's been updated")

            return redirect(url_for("user.view_post", post_id=post_id))


    # Using post ObjectId, get full post from db
    current_post = app.mongo.db.work_orders.find_one(
        {"_id": ObjectId(post_id)}
    )

    if current_post == None:
        current_post = app.mongo.db.incidents.find_one(
        {"_id": ObjectId(post_id)}
    )

    # Render view post template with fetched current post data
    return render_template("edit_post.html", post=current_post)


@user.route("/delete_post/<post_id>")
def delete_post(post_id):

    # Check post exists
    post_for_deletion = app.mongo.db.work_orders.find_one(
        {"_id": ObjectId(post_id)}
    )

    # If it exists as a work order
    if post_for_deletion:
         # Delete post utilising the post_id
        app.mongo.db.work_orders.delete_one({"_id": ObjectId(post_id)})

        # Inform user of post deletion
        flash("Post has been deleted successfully")

        return redirect(url_for("user.feed", user_email=session["user_email"]))

    # If a post hasn't been found
    elif post_for_deletion == None:

        # Look through the incidents db
        post_for_deletion = app.mongo.db.incidents.find_one(
            {"_id": ObjectId(post_id)}
        )

        # If it does exist now
        if post_for_deletion:

            # Delete post utilising the post_id
            app.mongo.db.incidents.delete_one({"_id": ObjectId(post_id)})

            # Inform user of post deletion
            flash("Post has been deleted successfully")

            return redirect(url_for("user.feed", user_email=session["user_email"]))


@user.route("update_comment/<comment_id>", methods=["GET", "POST"])
def update_comment(comment_id):

    # Retrieve comment from db
    comment = app.mongo.db.comments.find_one(
        {"_id": ObjectId(comment_id)}
    )

    # Retrieve parent post
    parent_post = app.mongo.db.work_orders.find_one(
        {"_id": ObjectId(comment["parent_post_id"])}
    )

    # If not work order, check incidents
    if not parent_post:
        parent_post = app.mongo.db.incidents.find_one(
            {"_id": ObjectId(comment["parent_post_id"])}
        )

    # If an updated comment has been submitted
    if request.method == "POST":

        # Grab new comment content
        updated_comment = {
            "content": request.form.get("content"),
            "date_created": datetime.datetime.now()
        }

        # Insert new comment content to existing comment in db
        app.mongo.db.comments.update_one(
            {"_id": ObjectId(comment_id)},
            {"$set": {
                "content": updated_comment["content"],
                "date_created": updated_comment["date_created"]
            }}
        )

        # Inform user of updated comment
        flash("Your comment has been updated successfully!")

        # Redirect user to viewing post page
        return redirect(url_for("user.view_post", post_id=parent_post["_id"]))

    # Retrieve comments related to post
    post_comments = list(app.mongo.db.comments.find(
        {"parent_post_id": ObjectId(parent_post["_id"])}
    ))

    # Calculate amount of comments linked to post
    parent_post["amount_of_comments"] = len(post_comments)

    # Get name from user db using the post author Id
    author_of_post = app.mongo.db.users.find_one({"_id": ObjectId(parent_post["author"])})
    parent_post["author_name"] = str(author_of_post["first_name"] + " " + author_of_post["last_name"])
    parent_post["author_id"] = str(parent_post["author"])

    return render_template("update_comment.html", comment=comment, post=parent_post)


@user.route("/delete_comment/<comment_id>")
def delete_comment(comment_id):

    # Obtain comment data
    comment = app.mongo.db.comments.find_one(
        {"_id": ObjectId(comment_id)}
    )

    # Check the current user is the author of the comment
    if str(comment["author"]) == session["user_id"]:
        
        # Delete the comment from comments db
        app.mongo.db.comments.delete_one(
            {"_id": ObjectId(comment_id)}
        )

        # Inform user of comment deletion
        flash("Comment has been successfully deleted")

        # Return user to view post
        return redirect(url_for("user.view_post", post_id=comment["parent_post_id"]))


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
