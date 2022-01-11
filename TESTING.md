# Llama Log Testing

This file contains all of the testing procedures undertaken during the development of Llama Log.

<img src="readme/llama-log-responsive.png">

[Link to deployment of Llama Log](https://llama-log.herokuapp.com/).

To navigate back to the README file, [click here](README.md)

## Contents

<hr>

## User Stories

**As an Employee using Llama Log, I'd expect to:**

<details>

<summary>Be prompted to create a password when I first log in.</summary>

- When provided a log-in email by an admin (in a real life scenario this would be a line/shift manager), the user can enter their email.

    <img src="readme/user-stories/user-story-employee-log-in.png">
    
- The user will then be prompted immediately to create a new password and re-enter for increased memorability.

    <img src="readme/user-stories/user-story-employee-password.png">

</details>

- Immediately see the live feed of posts when logging into the app.
- Quickly be able to create a new post when logging into the app.
- Be given an input form that's relevant to my current situation when creating a post.
- Quickly search for previous posts using a search field.
- Edit a post I've previously made.
- Delete posts I've previously made.

**As an Admin, I'd expect Llama Log to enable me in:**

- Creating new employee & admin user accounts.
- Deleting employee & admin user accounts.
- Editing all fields relating to an employee account (except password).
- Deleting posts that employee's have previously created.
- Deleting posts that former employee's have previously created.

**As a user of Llama Log, I'd expect to:**

- Log in to the app promptly.
- Immediately know what the app is about prior to logging in.
- Be familiar with it's design, so it's easily learnable.
- Immediately tell which information is important based on visual language alone.

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

#### Bulma dropdown menu sizing issue

After user testing was done, I immediately started integrating ways to communicate better the difference between a Work Order & an Incident.

The one I was happy with was simply adding some partially faded text next to the Work Order & Incident labels within the dropdown menu. However the problem this provided was that the dropdown was partially being displayed outside of the viewport on smaller mobile devices due to it's width being increased and it starting alongside the dropdown trigger button. The desired result for this would be to center the dropdown menu underneath the dropdown trigger.

I struggled to find a way in order to achieve this, however after viewing [this Stack Overflow answer](https://stackoverflow.com/a/48285817/15607265), it gave the idea to use left & right CSS properties with negative values in order to achieve the desired result.

The code that achieved the desired result is below:

<code>

    .dropdown .dropdown-menu {
    left: -1.5rem;
    right: -1.5rem;
}
</code>

<hr>

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

## File Validation

Below are all the validation procedures taken for each Python, JavaScript, CSS & HTML files.

### Python Files

The validator used in order to validate Llama Log's python files was the [PEP8 online](http://pep8online.com/) validator.

<details>

<summary>View Python Validation Results</summary>

- app.py 🗸

    - The main error & warning codes given by the validator regarding the app.py file were relating to trailing whitespace & lines being too long.
    - However one unique problem I had encountered was an E711 error, where PEP8 prefers the use of "is not" rather than "!=". After changing "!=" to "is not" within the code, the problem was resolved.
        
        <img src="readme/testing/validator-python-app.png">

- user.py 🗸

    - Like the previous file, user.py mainly contained errors relating to trailing whitespace & lines being too long.
    - One issue that did arise however was that a module level import was not at the top of the file. This problem relates to circular dependencies where the poisition of imports matter in making the application work. A simple and easy example to explain can be found [here](https://stackoverflow.com/a/62303448/15607265). At this time, this issue cannot be addressed due to time constraints and given that fixing this would not enhance the usability of Llama Log, I don't believe it's important for the time being as changing it would crash the entire application.
    - Another issue that came to light was assigning an f string to a variable over multiple lines. This was eventually fixed after reading [this article](https://careerkarma.com/blog/python-f-string/) with the use of parenthesis.
        
        <img src="readme/testing/validator-python-user.png">

- admin.py 🗸

    - The admin python file's validation results were nearly identical to the results given by the user python file's validation, where the import app statement isn't present at the top of the file and it's mostly trailing whitespace and lines being too long.
        
        <img src="readme/testing/validator-python-admin.png">

</details>
    
### JavaScript Files

The validator used in order to validate Llama Log's JavaScript files was the [JSHint](https://jshint.com/) validator.

<details>

<summary>View JavaScript Validation Results</summary>


- app.js 🗸

    - Initial validation results given by JSHint were mostly minor syntax errors, most of which relating to missing & unnecessary semicolons.
    - There were also leftover variables referring to functions that were eventually removed from the application.
    - The only warnings provided are undefined variables, both of which are utilised by the clamp.min.js file so are therefore important and necessary.
        
        <img src="readme/testing/validator-js-app.png">


- form.js 🗸

    - Intial validation results given by JSHint were entirely minor syntax errors, all being missing semicolons.
        
        <img src="readme/testing/validator-js-app.png">

- tooltips.js 🗸

    - Intial validation results given by JSHint were entirely minor syntax errors, all being either missing or unecessary semicolons.
    - There is one warning however relating to an undefined variable named tippy. This variable is a method provided by the tippy.js JavaScript library for tooltips, which is important and necessary for the application.
        
        <img src="readme/testing/validator-js-tooltips.png">

</details>

### CSS File

The validator used in order to validate Llama Log's style.css file was the [W3C's CSS Validation Service](https://jigsaw.w3.org/css-validator/) validator.

<details>

<summary>View CSS Validation Result</summary>

- style.css 🗸

    - Fortunately, there were no errors given by the CSS validator. It did provide 2 warnings however, both relating to the webkit vendor prefix selectors for the progress bars.
        
        <img src="readme/testing/validator-style-css.png">

</details>

### HTML Template Files

The validator used in order to validate Llama Log's HTML template files was the [W3C's Markup Validation Service](https://validator.w3.org/) validator.

#### External Pages

<details>

<summary>View External HTML Validation Results</summary>

- index.html (Log-In Page) 🗸

    - Intial validation results included 1 warning & 3 errors.
    - The warning was referring to including a navigation role attribute within the navbar. This was prompty fixed. Given this was within the base template, this would've persisted across all pages so it's good to remove this.
    - The errors were referring to the lack of an alt attribute for the images within the page. This was the case for images within the base template & index.html itself.
    - Addressing these minor issues provided a successful result.

        <img src="readme/testing/validator-html-index.png">


- password.html (Create New Password) 🗸

    - Intial validation results provided no errors or warnings, therefore resulting in a successful result.

        <img src="readme/testing/validator-html-password-create.png">

- password.html (Enter Existing Password) 🗸

    - Intitial validation results only provided 1 error, that being a messing alt attribute for an image which was prompty added.
    - Addressing this minor issue provided a successful result.

        <img src="readme/testing/validator-html-password-existing.png">

</details>

#### Internal Pages

<details>

<summary>View Internal HTML Validation Results</summary>

- account.html 🗸

    - Initial validation results only provided 1 warning, referring to the lack of a heading within a section element contained within a modal.
    - Considering the modal template was utilised throughout multiple pages, I added a heading within all of these modals within various pages, so this isn't a recurring issue during the validation process.
    - Addressing the heading issue provided a successful result.

        <img src="readme/testing/validator-html-account.png">


- feed.html 🗸

    - Initial validation results provided various warnings and errors, which I believe to be exaggerated given they often refer to an individual post, where multiple of said post results in duplicate errors.
    - One of which was a lack of heading within a section element which was promptly fixed.
    - Another was a time element's text content not being within the correct format.
    - The error was referring to multiple dropdown-oriented elements having the same ID attribute values. This was promptly fixed by concatenating unique post data on top of the id to keep the ID's seperate from one another. Considering this was going to persist over a few other pages, I addressed this issue within the other pages too.
    - Addressing these provided a successful result.

        <img src="readme/testing/validator-html-feed.png">

- create_post.html 🗸

    - Intial validation results provided no errors or warnings, therefore resulting in a successful result.

        <img src="readme/testing/validator-html-create-post.png">

- view-post.html 🗸

    - Intial validation results provided no errors or warnings, therefore resulting in a successful result.

        <img src="readme/testing/validator-html-view-post.png">

- edit_post.html 🗸

    - Intial validation results provided no errors or warnings, therefore resulting in a successful result.

        <img src="readme/testing/validator-html-edit-post.png">

- update_comment.html 🗸

    - Initial validation results provided one error, where a textarea had contained 2 rows attributes, one being 2 and another being 3. Given the intention was 3, the rows="2" was promptly removed and fixed the problem.
    - Addressing this attribute resulted in a successful result.

        <img src="readme/testing/validator-html-update-comment.png">

</details>

#### Admin Oriented Pages

<details>

<summary>View Admin Oriented HTML Validation Results</summary>

- manage.html 🗸

    - Intitial validation results provided multiple warnings, where section elements did not contain a header element which was promptly fixed.
    - Addressing this header issue resulted in a successful result.

        <img src="readme/testing/validator-html-manage.png">

- create_user.html 🗸

    - Initial validation results provided a single error, which related to date input element contained a placeholder, which is not allowed. This was promptly fixed after removing this placeholder.
    - Addressing this header issue resulted in a successful result.

        <img src="readme/testing/validator-html-create-user.png">

- edit_user.html 🗸

    - Prior to validating this file, I addressed the headings within section elements as I was aware that this was a recurring error.
    - Initial validation results after this quick fix resulted in a successful result.

        <img src="readme/testing/validator-html-edit-user.png">

</details>

#### Error Pages

- 403.html

- 404.html

- 500.html





