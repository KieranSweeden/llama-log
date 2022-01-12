import datetime
from flask import (Blueprint, render_template, url_for,
                   request, flash, redirect, session, abort)
from flask_pymongo import ObjectId

user = Blueprint("user", __name__,
                 static_folder="../static",
                 template_folder="templates")

import app


@user.route("/feed/<user_email>", methods=["GET", "POST"])
def feed(user_email):

    """
    Renders feed with all posts by default
    Post request is the post filter
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

        # If a filter request has been made
        if request.method == "GET":

            # Grab the filter text the user has entered
            search_filter = request.args.get("filter")

            if search_filter is None or search_filter == "":

                # Retrieve work orders & incidents
                work_orders = list(app.mongo.db.work_orders.find())
                incidents = list(app.mongo.db.incidents.find())

                # Combine both into single list
                posts = work_orders + incidents

                # Sort by date
                posts.sort(reverse=True, key=sort_by_date_created)

                # Get current user data
                current_user = app.mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}
                )

                # For each post
                for post in posts:

                    # Grab the name of the author and add it to post dict
                    author_of_post = app.mongo.db.users.find_one(
                        {"_id": ObjectId(post["author"])})
                    post["author_name"] = str(
                        author_of_post["first_name"] + " " +
                        author_of_post["last_name"])
                    post["author_id"] = str(post["author"])

                    # Search comments to find children comments to post
                    post_comments = list(app.mongo.db.comments.find(
                        {"parent_post_id": post["_id"]}
                    ))

                    # Set amount of comments to length of obtained comments
                    post["amount_of_comments"] = len(post_comments)

                # render templates sending the posts
                return render_template("feed.html",
                                       user_email=user_email,
                                       posts=posts,
                                       user=current_user)

            else:

                # Grab work orders & incidents
                work_orders = list(app.mongo.db.work_orders.find())
                incidents = list(app.mongo.db.incidents.find())

                # Combine both into single list
                posts = work_orders + incidents

                # Create empty list to contain filtered lists
                filtered_posts = list()

                # Loop through each post
                for post in posts:

                    # If the search term is within title or description of post
                    if (search_filter.lower() in
                        post["title"].lower() or
                            search_filter.lower() in
                            post["description"].lower()):

                        # Add post to the filtered post list
                        filtered_posts.append(post)

                    # Grab comments associated with post
                    post_comments = list(app.mongo.db.comments.find(
                        {"parent_post_id": ObjectId(post["_id"])}
                    ))

                    # Looping through the comments
                    for comment in post_comments:

                        # If search term is found within comment content
                        if search_filter in comment["content"]:

                            # Add post to the filtered post list
                            filtered_posts.append(post)

                # Sort by date
                filtered_posts.sort(reverse=True, key=sort_by_date_created)

                # For each post
                for post in posts:

                    # Grab the name of the author and add it to post dict
                    author_of_post = app.mongo.db.users.find_one(
                        {"_id": ObjectId(post["author"])})

                    # Concatenate name & add to post author name
                    post["author_name"] = str(author_of_post["first_name"] +
                                              " " +
                                              author_of_post["last_name"])

                    # Add author id to post
                    post["author_id"] = str(post["author"])

                    # Search comments to see if any are linked to post
                    post_comments = list(app.mongo.db.comments.find(
                        {"parent_post_id": post["_id"]}
                    ))

                    # Set amount of comments to length of obtained comments
                    post["amount_of_comments"] = len(post_comments)

                # Get current user data
                current_user = app.mongo.db.users.find_one(
                    {"_id": ObjectId(session["user_id"])}
                )

                # render templates sending the posts
                return render_template("feed.html",
                                       user_email=user_email,
                                       posts=filtered_posts,
                                       user=current_user,
                                       search_filter=search_filter)

        else:

            # Retrieve work orders & incidents
            work_orders = list(app.mongo.db.work_orders.find())
            incidents = list(app.mongo.db.incidents.find())

            # Combine both into single list
            posts = work_orders + incidents

            # Sort by date
            posts.sort(reverse=True, key=sort_by_date_created)

            # Get current user data
            current_user = app.mongo.db.users.find_one(
                {"_id": ObjectId(session["user_id"])}
            )

            # For each post
            for post in posts:

                # Grab the name of the author and add it to post dict
                author_of_post = app.mongo.db.users.find_one(
                    {"_id": ObjectId(post["author"])})

                # Concatenate full name & add to post
                post["author_name"] = str(author_of_post["first_name"] +
                                          " " +
                                          author_of_post["last_name"])

                # Add author id to post
                post["author_id"] = str(post["author"])

                # Search the comments to see if any comments are linked to post
                post_comments = list(app.mongo.db.comments.find(
                    {"parent_post_id": post["_id"]}
                ))

                # Set amount of comments to length of obtained comments
                post["amount_of_comments"] = len(post_comments)

            # render templates sending the posts
            return render_template("feed.html",
                                   user_email=user_email,
                                   posts=posts,
                                   user=current_user)


def sort_by_date_created(post):

    """Sorts posts by date created"""

    return post['date_created']


@user.route("/create_post/<category>", methods=["POST", "GET"])
def create_post(category):

    """
    Renders create post page
    Form post submission adds new post to db
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

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
                flash("Your new work order has been "
                      "successfully posted", "success")

                # Redirect user to the feed page
                return redirect(url_for("user.feed",
                                        user_email=session["user_email"]))

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

                # Inform user that incident submission was successful
                flash("Your new incident post has "
                      "been successfully posted", "success")

                # Redirect user to the feed page
                return redirect(url_for("user.feed",
                                        user_email=session["user_email"]))

        # If no form submission has been made, render the create post page
        return render_template("create_post.html", category=category)


@user.route("/view_post/<post_id>", methods=["POST", "GET"])
def view_post(post_id):

    """
    Renders view post page
    Form post submission adds new comment
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

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
            flash("Your comment has been successfully posted", "success")

            # Redirect user to view post with new comment showing
            return redirect(url_for("user.view_post", post_id=post_id))

        # Using post ObjectId, get full post from work order db
        current_post = app.mongo.db.work_orders.find_one(
            {"_id": ObjectId(post_id)}
        )

        # If post not work order, check the incidents db
        if current_post is None:
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
            post_comment["author_name"] = (f"{author['first_name']} "
                                           f"{author['last_name']}")

            # Convert author ID to string to use for comparison within page
            post_comment["author"] = str(post_comment["author"])

        # Get name from user db using the post author Id
        author_of_post = app.mongo.db.users.find_one(
            {"_id": ObjectId(current_post["author"])})

        # Concatenate name and add to current post
        current_post["author_name"] = str(author_of_post["first_name"] +
                                          " " +
                                          author_of_post["last_name"])

        # Add author id to current post
        current_post["author_id"] = str(current_post["author"])

        # Get current user data
        current_user = app.mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}
        )

        # Render view post template with fetched current post data
        return render_template("view_post.html",
                               post=current_post,
                               post_comments=post_comments,
                               user=current_user)


@user.route("/edit_post/<post_id>", methods=["POST", "GET"])
def edit_post(post_id):

    """
    Renders edit post page
    Form post submission updates post in db
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

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
                flash("Your post has been updated", "success")

                return redirect(url_for("user.view_post", post_id=post_id))

        # Using post ObjectId, get full post from db
        current_post = app.mongo.db.work_orders.find_one(
            {"_id": ObjectId(post_id)}
        )

        # If no work orders are found, check the incidents
        if current_post is None:
            current_post = app.mongo.db.incidents.find_one(
                {"_id": ObjectId(post_id)}
            )

        # Render view post template with fetched current post data
        return render_template("edit_post.html", post=current_post)


@user.route("/delete_post/<post_id>")
def delete_post(post_id):

    """
    Redirects user to feed page
    Deletes post in db
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

        # Check post exists
        post_for_deletion = app.mongo.db.work_orders.find_one(
            {"_id": ObjectId(post_id)}
        )

        # If it exists as a work order
        if post_for_deletion:
            # Delete post utilising the post_id
            app.mongo.db.work_orders.delete_one(
                {"_id": ObjectId(post_id)}
            )

            # Delete comments that are children to post
            app.mongo.db.comments.delete_many(
                {"parent_post_id": ObjectId(post_id)}
            )

            # Inform user of post deletion
            flash("Post has been deleted successfully", "success")

            return redirect(url_for("user.feed",
                                    user_email=session["user_email"]))

        # If a post hasn't been found
        elif post_for_deletion is None:

            # Look through the incidents db
            post_for_deletion = app.mongo.db.incidents.find_one(
                {"_id": ObjectId(post_id)}
            )

            # If it does exist now
            if post_for_deletion:

                # Delete post utilising the post_id
                app.mongo.db.incidents.delete_one({"_id": ObjectId(post_id)})

                # Delete comments that are children to post
                app.mongo.db.comments.delete_many(
                    {"parent_post_id": ObjectId(post_id)}
                )

                # Inform user of post deletion
                flash("Post has been deleted successfully", "success")

                # Redirect user to feed page
                return redirect(url_for("user.feed",
                                        user_email=session["user_email"]))


@user.route("update_comment/<comment_id>", methods=["GET", "POST"])
def update_comment(comment_id):

    """
    Renders edit comment page
    Form post submission updates comment in db
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

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
            flash("Your comment has been updated successfully!", "success")

            # Redirect user to viewing post page
            return redirect(url_for("user.view_post",
                                    post_id=parent_post["_id"]))

        # Retrieve comments related to post
        post_comments = list(app.mongo.db.comments.find(
            {"parent_post_id": ObjectId(parent_post["_id"])}
        ))

        # Calculate amount of comments linked to post
        parent_post["amount_of_comments"] = len(post_comments)

        # Get name from user db using the post author Id
        author_of_post = app.mongo.db.users.find_one(
            {"_id": ObjectId(parent_post["author"])})
        parent_post["author_name"] = str(author_of_post["first_name"] +
                                         " " +
                                         author_of_post["last_name"])

        # Add parent post author id to parent post
        parent_post["author_id"] = str(parent_post["author"])

        # Render update comment page
        return render_template("update_comment.html",
                               comment=comment,
                               post=parent_post)


@user.route("/delete_comment/<comment_id>")
def delete_comment(comment_id):

    """
    Redirects user to view page
    Deletes comment from db
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

        # Obtain comment data
        comment = app.mongo.db.comments.find_one(
            {"_id": ObjectId(comment_id)}
        )

        # Obtain current user data
        current_user = app.mongo.db.users.find_one(
            {"_id": ObjectId(session["user_id"])}
        )

        # Check the current user is the author of the comment
        if (str(comment["author"]) == session["user_id"] or
                current_user["is_admin"] is True):

            # Delete the comment from comments db
            app.mongo.db.comments.delete_one(
                {"_id": ObjectId(comment_id)}
            )

            # Inform user of comment deletion
            flash("Comment has been successfully deleted", "success")

            # Return user to view post
            return redirect(url_for("user.view_post",
                                    post_id=comment["parent_post_id"]))


@user.route("/account/<user_email>", methods=["POST", "GET"])
def account(user_email):

    """
    Renders account page
    Form submission updates user credentials in db
    """

    # If user is not signed in
    if "user_id" not in session:

        abort(403)

    else:

        # Grab current user
        current_user = app.mongo.db.users.find_one(
            {"email": user_email}
        )

        # If account form update request is made
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

            # If the user's email has been changed
            if updated_user_info["email"] != current_user["email"]:

                # Update email in session
                session["user_email"] = updated_user_info["email"]

            # Update the user info in db with new info submitted
            app.mongo.db.users.update_one({"_id": current_user["_id"]},
                                          {"$set": updated_user_info})

            # Inform user account update was successful
            flash("Your account has been updated successfully!", "success")

            # Redirect the user to the manage users page
            return redirect(url_for("user.account",
                                    user_email=session["user_email"]))

        # Render the account page
        return render_template("account.html", current_user=current_user)
