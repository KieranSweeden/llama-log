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

#### TypeError index 'author' cannot be applied to Cursor instances

When adding the comment feature to the application, I encountered an issue where I could not add a new key value pair to a Cursor object. In this instance, I was attempting to add an author_name key to a comment cursor object so I could display a comment's author on the page.

I later came to realise after reading [this post](https://matthewmoisen.com/blog/pymongo-typeerror-index-password-cannot-be-applied-to-cursor-instances/) that this simply could not be done with cursor objects. However if I use find_one() instead of find(), this would return a document instead of a cursor object. This meant the functionality I wanted to encorporate could be done and the issue was then resolved.

Code can be found below:

<code>

    for post_comment in post_comments:

        # Grab user from db
        author = app.mongo.db.users.find_one(
            {"_id": ObjectId(post_comment["author"])}
        )

        # Add author name to post comment using author values
        post_comment["author_name"] = f"{author['first_name']} {author['last_name']}"
</code>

#### An invalid form control with name='' is not focusable

After implementing the code to hide customer involved fields, I noticed that incidents could not longer be posted to the incidents database.

Looking at the console after clicking the submit form button provided these errors:

<code>

    An invalid form control with name="customer_name" is not focusable

    An invalid form control with name="customer_phone" is not focusable

</code>

I later found [this Stack Overflow post](https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable) where another user encountered this issue. Although a few of the answers were not applicable to my own problem, [an answer further down the page](https://stackoverflow.com/a/23215333/15607265) by Ankit Sharma provided a light bulb moment.

It then came to me that although the input fields were hidden from the user, they were still present within the DOM and were required in order to submit the form. To fix this issue, I wrote some Javascript that removed & added the required attribute to these inputs dynamically depending on the status of the customer involved radio buttons.

An example of the Javascript code is below (this is the code for when fields are enabled, the code for disabling is the same but reversed where required = false):

<code>

    // Grab customer involved input fields
    let customerInvolvedFields = [...customerFieldsContainer.getElementsByTagName("input")];

    // Add required attribute to each input field
    customerInvolvedFields.forEach(inputField => {
        inputField.required = true;
    });

</code>

## User Testing

To test the user friendliness of Llama Log, I gave a family member (whom I will call tester within this chapter) a series of tasks to complete. While they were attempting to complete said tasks, I assessed how they interacted with Llama Log, in order to see how effective the UI is.

The tester happens to be a line manager within their place of work. I believe this makes their opinion significantly more valuable, as they often have to assist fellow colleagues in operating productivity programs & hardware equipment within the workplace.

Similar to a colleague being given an email in order to sign in by their line manager or administrator of some kind, I gave the tester an email for them to sign in with. When signed in with their own password, they're then tasked in completing the following:

- Create an incident post.
- Update the existing post.
- Comment on an existing post.
- Edit the comment they previously made.
- Delete the comment they previously made.
- Update their mobile number within their account.
- Reset their password & create a new one.
- Find posts that relate to a fridge within the workplace.

I was pleased to find that in terms of completing these tasks, the tester had no problem with them. They did however raise some interesting & useful concerns.

- One was the lack of clarity between Work Orders & Incidents. The tester believed the lines were blurred between the two and as a user, it was hard to decide which option to go for. An example they provided was the case in which a customer falls into an appliance such as a product fridge and breaks the glass. A work order will need to be made as a piece of equipment is broken, however it also involves a customer.

    - Taking this advice onboard, I got added some additional text for each option within the "Create New Post" dropdown list. Making it clear that work orders relate to equipment and incidents are staff & customer related.

- Another minor concern was the icon used to signify an incident. Originally it was two speech bubbles colliding, which has a conversational feel which incidents do often initiate. The tester disagreed and preferred the idea of using an exclamation mark contained within a circle. They believed the exclamation mark related to the idea of incidents more than the original speech bubble icon.

    - I took this advice onboard and changed the icon for signifying an incident to an exclamation mark. Upon looking at the final result in looking at the feed page & incident post as a whole, I believe this to the correct option.

- A feature the tester assumed that would be integrated was an archive, where posts can be put away and looked at when needed in the future. This was on the agenda for future releases and their assumption is a clear indicator that this feature is worth integrating within a future release of Llama Log.

To conclude, despite the tester not being involved within the industry that Llama Log is targetting, their advice & experience with Llama Log was tremendously useful. It made clear that some of my assumptions regarding how comfortable the end user would be in interacting with Llama Log were wrong. This meant adding further guidance with the use of tooltips & error messages would be vital in providing confidence for the end user when using Llama Log. 




