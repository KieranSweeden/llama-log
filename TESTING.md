# Llama Log Testing

> insert image here

To navigate back to the README file, [click here](README.md)

## Contents

<hr>

## Bugs

### Fixed

The following are bugs that I have dealt with and fixed:

#### Circular Imports with Python Files

Llama Log has been developed with maintainablity in mind, seperating the app into different modules with the use of flask blueprints based on their functionality.

A problem this provided however, was retrieving the mongo object instance from the initial python file in order to push data to mongo databases. Other python files importing this mongo instance from the intial python file resulted in an error due to circular imports, as the python files would then be interdependant of one another.

I came to fix this problem after reading [this Stack Overflow post answer](https://stackoverflow.com/a/57445032/15607265). It was apparent that imports needed to be made deeper within the file when needed, not at the top of the file.

#### AttributeError: ‘str’ object has no attribute ‘password’

Once the user has entered their email, they're sent to the password page where they can either enter their current password or create a new password if a password isn't present in their respective doc in the database. When attempting a form POST request for this however, an error occured displaying:

> <code>AttributeError: ‘str’ object has no attribute ‘password’</code>

After placing prints throughout the application, I noticed that I was assuming a variable was a cursor dictionary object, when in fact it was actually a string.

To get around this problem, I retrieved the document from within the password view rather than passing the document from the log_in view to the password view as a variable. From here I could retrieve the data I needed and fix the issue.

#### Logo image was not loading on blueprint template pages

The Llama Logo was not being loaded onto pages that are blueprint templates.

This was a clear user error on my part, as the filepath value within the src attribute of the image was written as a normal filepath, not formatted in the recommended way by Flask.

Once changing:

> <code>src="static/images/llama-log-logo-no-text.png"</code>

To:

> <code>src="{{ url_for('static', filename='images/llama-log-logo-no-text.png')}}"</code>

The problem was solved.

#### TypeError: ObjectId('') is not JSON serializable

As the ObjectId field is the unique identifier for users within the MongoDb database, it made sense to store this within a flask session, enabling me the use the ID in retrieving user data.

When attempting this however using the code shown below, it threw a TypeError stating it's not JSON serializable.

> <code>session["user_id"] = existing_user["_id"]</code>

An easy fix was found from Gilko's comment within [this post](https://coderedirect.com/questions/119169/typeerror-objectid-is-not-json-serializable), where the ObjectId was stored within the session as a string as shown below:

> <code>session["user_id"] = str(existing_user["_id"])</code>

#### Variables sent within render_template were not being displayed

For each post, the author field value is the author's user ObjectId. This is so I'm able to reference the ID and add additional information for particular use cases.

A use case that eventually created this bug was getting an ObjectId from a post's author field, finding the user within the user collection using this ObjectId and adding a full name field to the post dictionary by concatenating the first_name & last_name fields within the user document. After this, I noticed that posts were no longer being displayed on the page.

I came across [this Stack Overflow answer](https://stackoverflow.com/a/32268274/15607265) which simply states that using the list constructor. Taking on this advice allowed me to fix this issue with the code shown below:

<code>

    def feed(user_email):

        # Retrieve posts for feed from db
        posts = list(app.mongo.db.work_orders.find())

        # Get & full name for each post
        for post in posts:
            author_of_post = app.mongo.db.users.find_one({"_id": ObjectId(post["author"])})
            post["author_name"] = str(author_of_post["first_name"] + " " + author_of_post["last_name"])

        return render_template("feed.html", user_email=user_email, posts=posts)
</code>

