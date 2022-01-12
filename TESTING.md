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

<details>

<summary>Immediately see the live feed of posts when logging into the app.</summary>

- When logging in, the user is immediately directed to the feed page. The user is also immediately directed to the feed from the log in page if a session still remains within the browser.

    <img src="readme/user-stories/user-story-employee-feed-posts.png">

</details>

<details>

<summary>Quickly be able to create a new post when logging into the app.</summary>

- When logged in and viewing the feed page, a create new post is above all the posts previously made.

    <img src="readme/user-stories/user-story-employee-feed-posts.png">

- Clicking this provides an option to create a new incident or work order post.

    <img src="readme/user-stories/user-story-create-post-feed.png">

- Selecting an option directs the user to a create new post form that presents fields that directly relate to their chosen category of post.

    <img src="readme/user-stories/user-story-create-work-order-empty.png">

    <img src="readme/user-stories/user-story-create-incident-empty.png">

- From here they can submit their post provided they enter all fields.

    <img src="readme/user-stories/user-story-create-incident-progress.png">

    <img src="readme/user-stories/user-story-create-incident-completed.png">

- When submitted, user is redirected to feed where they can see their post and is given message to state how message has been sent.

    <img src="readme/user-stories/user-story-create-incident-successful.png">

</details>

<details>

<summary>Be given an input form that's relevant to my current situation when creating a post.</summary>

- When creating a new post, the input form's fields are relevant to the current situation.

    <img src="readme/user-stories/user-story-create-incident-empty.png">

    <img src="readme/user-stories/user-story-create-work-order-empty.png">

</details>

<details>

<summary>Quickly search for previous posts using a search field.</summary>

- When logging in, a search bar is present at the top of the posts so it's clearly visible to the user.

    <img src="readme/user-stories/user-story-employee-feed-posts.png">

- Typing in a search term within the field & pressing enter provides the user with a filtered list of posts.

    <img src="readme/user-stories/user-story-search-posts.png">

</details>

<details>

<summary>Edit a post I've previously made.</summary>

- To edit posts, Llama Log follows UX conventions in using the three dots to give the user an indication of "more options". Clicking this provides additional options, one of which being editing a post.

    <img src="readme/user-stories/user-story-post-options.png">

- Clicking this takes the user to a form similar to the create post one, presenting the fields relevant to that particular post.

    <img src="readme/user-stories/user-story-edit-post.png">

- Provided the user maintains that all fields are given, they can then submit and the post will be updated. The user will be redirected to the feed page with a message informing them of the update.

    <img src="readme/user-stories/user-story-edit-post-completed.png">

</details>

<details>

<summary>Delete posts I've previously made.</summary>

- Similar to edit posts, clicking the conventional three dots will provide additional options relating to a particular post. One of these options is deleting the post.

    <img src="readme/user-stories/user-story-post-options.png">

- Selecting the delete post option, following defensive programming conventions, displays a modal to make sure the user is sure they want to delete the particular post.

    <img src="readme/user-stories/user-story-delete-post-modal.png">

- The user is free to cancel using the provided x and cancel buttons. However if they're sure of the deletion, they can confirm using the delete button. This will delete the post & inform them whilst redirecting them to the feed page.

    <img src="readme/user-stories/user-story-delete-post-confirmed.png">

</details>

**As an Admin, I'd expect Llama Log to enable me in:**

<details>

<summary>Creating new employee & admin user accounts.</summary>

- When signed in & arriving on the feed page, admins can manage user accounts by navigating to the "Manage Users" link in the top navbar.

    <img src="readme/user-stories/user-story-employee-feed-posts.png">

- Once arriving on the manage users page, the admin is presented with a list of users with clear buttons referring to what they can do with the accounts.

    <img src="readme/user-stories/user-story-manage-users.png">

- An add user account is at the top of the page, similar to the post page where creating a new post is at the top of it's respective page. Clicking this button directs the user to a create new user form.

    <img src="readme/user-stories/user-story-create-user.png">

- Provided all fields are filled (except the admin checkbox which is optional), the user is able to create a new account. Once created, they'll be redirected to the manage page with a message informing them of the created profile.

    <img src="readme/user-stories/user-story-create-user-successful.png">

</details>

<details>

<summary>Deleting employee & admin user accounts.</summary>

- When signed in and navigated to the manage users page, the admin is able to delete users directly from the manage page. The delete button is located within the card footer of each respective user account.

    <img src="readme/user-stories/user-story-employee-feed-posts.png">

- Following defensive programming conventions, an "are you sure?" modal is presented to the admin regarding the deletion of the user. This also informs the admin that posts & comments made by the user will persist but will be put under a "Deleted User" alias.

    <img src="readme/user-stories/user-story-delete-user-modal.png">

- Provided the admin is sure and presses the delete the button, the user account will then be deleted, the posts & comments made by that user will transition to the deleted user alias and the admin will be informed of this deletion after being directed to the manage users page.

    <img src="readme/user-stories/user-story-delete-user-confirmed.png">

</details>

<details>

<summary>Editing all fields relating to an employee account (except password).</summary>

- When signed in and navigated to the manage users page, the admin is able to edit user accounts directly from the manage page. The edit button is located within the card footer of each respective user account.

    <img src="readme/user-stories/user-story-employee-feed-posts.png">

- When clicking this button, it opens an edit form similar to the create user form which is filled with the user's account data.

    <img src="readme/user-stories/user-story-edit-user-form.png">

- Provided all fields are filled (except the admin checkbox with is optional), the admin is able to update the user. On submission, the admin will be redirected to the manage users page with a message informing them that the user's account has been updated.

    <img src="readme/user-stories/user-story-edit-user-success.png">

</details>

<details>

<summary>Deleting posts that employee's have previously created.</summary>

- From the feed page, the admin is able to delete other user's posts. This can be done using the conventional three dots dropdown button which provides a delete option.

    <img src="readme/user-stories/user-story-delete-post-admin.png">

- Following defensive programming conventions, clicking the delete button opens a modal confirming that the admin is sure they want to delete the post.

    <img src="readme/user-stories/user-story-delete-post-admin-modal.png">

- Clicking the delete button will delete the post & comments associated with it, redirect the admin to the feed page and inform them of the deletion.

    <img src="readme/user-stories/user-story-delete-post-admin-success.png">

</details>

<details>

<summary>Deleting posts that former employee's have previously created.</summary>

- From the feed page, the admin is able to delete deleted user's posts. This can be done using the conventional three dots dropdown button which provides a delete option.

    <img src="readme/user-stories/user-story-deleted-user-post-options.png">

- Similar to regular posts and following defensive programming conventions, the admin is presented a modal that makes sure that they want to delete the deleted user's post.

    <img src="readme/user-stories/user-story-delete-post-admin-modal.png">

- Clicking the delete button will delete the deleted user's post & comments associated with it, redirect the admin to the feed page and inform them of the deletion.

    <img src="readme/user-stories/user-story-delete-post-admin-success.png">

</details>

**As a user of Llama Log, I'd expect to:**

<details>

<summary>Log in to the app promptly.</summary>

- When loading up Llama Log, the first page is the log in page where the log in form is front & centre. The application also auto focuses onto the input field, saving the user any additional time it would take to focus on the input.

    <img src="readme/user-stories/user-story-employee-log-in.png">

- The password is nearly identical to the log in page, this saves the user any time in getting familiar with the page as they'll know exactly what to do and where things are within the page. This page also includes the auto focus which saves the user time when logging in.

    <img src="readme/user-stories/user-story-employee-password.png">
    
</details>

<details>

<summary>Immediately know what the app is about prior to logging in.</summary>

- On load, the user is greeted with the following paragraph that provides a brief description of what Llama Log is about.

    <img src="readme/user-stories/user-story-log-in-text.png">

- Further information can be found within the footer of every page, including the log in page that the user first sees.

    <img src="readme/user-stories/user-story-footer-info.png">

</details>

<details>

<summary>Be familiar with it's design, so it's easily learnable.</summary>

- The navigation bar is consistent and therefore easily learnable throughout multiple pages.

    <img src="readme/user-stories/user-story-employee-log-in.png">

    <img src="readme/user-stories/user-story-manage-users.png">

- It also collapses to the hamburger design for mobile devices, following traditional UI conventions, making the interface easily learnable for the end user.

    <img src="readme/user-stories/user-story-nav-mobile-closed.png">

    <img src="readme/user-stories/user-story-nav-mobile-open.png">

- The feed page is designed in such a way that resembles a live feed design sported by the likes of Facebook, Twitter, LinkedIn etc. This makes it easily understood.

    <img src="readme/user-stories/user-story-employee-feed-posts.png">

- Buttons that add a particular "item" such as an incident, comment, comment or user sport for the primary green colour.

    <img src="readme/user-stories/user-story-button-green-comment.png">

    <img src="readme/user-stories/user-story-button-green-feed.png">

    <img src="readme/user-stories/user-story-buttons-manage.png">

- Buttons that relate to going back a page sport the yellow warning colour.

    <img src="readme/user-stories/user-story-buttons-manage.png">

    <img src="readme/user-stories/user-story-button-yellow-post.png">

    <img src="readme/user-stories/user-story-button-yellow-account.png">

    <img src="readme/user-stories/user-story-button-yellow-modal.png">

- Buttons that relate to the deletion of a particular item sport a red danger colour.

    <img src="readme/user-stories/user-story-button-yellow-modal.png">

    <img src="readme/user-stories/user-story-button-red-manage.png">

- These examples in conjuction with one another enable the web application to be easily to learn.

</details>

<details>

<summary>Immediately tell which information is important based on visual language alone.</summary>

- Headers are presented consistently at the top of all pages. This immediately informs them what pages they're on and ensures they're never lost within the application.

    <img src="readme/user-stories/user-story-login-header.png">

    <img src="readme/user-stories/user-story-feed-header.png">

    <img src="readme/user-stories/user-story-account-header.png">

- Buttons most likely important to user is presented immediately to the user without being overwhelming, an example being the cards within the manage users page.

    <img src="readme/user-stories/user-story-manage-user-card.png">

- Some information is hidden from the user unless they are directly interested in that information. An example being customer's information within incident posts. It's not useful the average gaze throughout the feed, so it's removed for simplicity purposes and provides extra importance to info that is shown to the user.

- Notice how the customer fields are hidden to the user on the feed page.

    <img src="readme/user-stories/user-story-incident-feed-post.png">

- Now look at the same incident being viewed purposefully.

    <img src="readme/user-stories/user-story-incident-view-post.png">

</details>

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

## Defensive Programming

Following standard security conventions, a python file containing sensitive environment variables is hidden from this repository. This is achieved by adding the file name to the .gitignore file.

Interal pages within the web application require a session within the web browser. Without this, the user is considered forbidden from accessing the web application and is redirected to the appropriate error message informing them of this. Within this error message, there's a link to redirect the user to the log in page.

This functionality is also applied to users who are not administrators. Any attempt to access the admin oriented pages whilst not being an admin will produce a forbidden error.

## Testing Functionality

The test procedure undertaken mainly focused on the CRUD functionalities & user feedback when using the application. However, the design and layout of the application was also accessed, in order to find visual bugs.

The testing spreadsheet used to test Llama Log can be found [here](https://docs.google.com/spreadsheets/d/1SXklniT6aiyQOdub6iv8LPJcEH9exj1sZnazYNQNC1U/edit?usp=sharing).

Llama was developed using Google Chrome & it's Dev Tools. Despite using this browser for development, I thought it was safe to apply the same test methodologies used on other browsers to Google Chrome, to solidify it's functionality.

### Software

The following browsers were used to test Llama Log:

**Desktop**

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

**Mobile & Tablet**

- Google Chrome
- Safari
- Mozilla Firefox

### Hardware

The hardware used to test Llama Log was the following:

**Desktop**

- Dell XPS 15" Laptop

**Tablet**

- Apple iPad

**Mobile**

- Apple iPhone 13 Pro Max

## Accessibility & Performance

To test the accessibility & Performance of Llama Log, I used Google Chrome's [Lighthouse](https://developers.google.com/web/tools/lighthouse) tool.

The initial result for the feed page was as follows:

<details>

<summary>Intial Lighthouse Results</summary>

<img src="readme/a11y-performance/initial-lighthouse.png">

</details>

Although these results were not terrible, they were not ideal. Some of the issues Lighthouse raised were as follows:

**Performance**

- A fair amount of the issues were relating to the minified Bulma css file, the time it was taking to receive the file was considerably long and therefore a problem. This cannot be addressed at this moment due to time constraints.

- Another issue raised was the lack of height & width attribute given to image elements. This was addressed throughout all pages as I knew these attributes were not applied to all image elements.

- It was later found out that an anonymous chrome session found no problem in fetching the bulma css files. It is my assumption that perhaps extensions running within my browser affected the performance of Llama Log at the time. When extensions are not present, Llama Log performs well as shown below:

    <details>

    <summary>Anonymous Session Results With Fixes So Far</summary>

    <img src="readme/a11y-performance/anon-lighthouse-results.png">

    </details>

**Accessibility**

- One issue was relating to the alt text for social media links within the footer of the page. This was promptly fixed using aria-labels, as adding text within the link elements would degrade the visuals of the footer.

- Another issue was that headers were not in sequentially-descending order. This was fixed by making the headings the correct number and applying bulma text size classes to them to revert them back to how they previously looked.

- Another minor issue was present regarding the post buttons not having an appropriate label attached to them. This was fixed for all pages featuring this dropdown.

**SEO**

- One of the issues raised with SEO was the lack of a meta tag within the head of the HTML document. This was prompty fixed as only the base template file needed to be changed.

- The last issue relating to SEO was relating to a robots.txt file, which I am unsure of and do not have the appropriate amount of understanding of this to fix it. Post-submission this may be something to look into.

**Post Fixes**

After completing some of these tasks, I ended up with a promising Lighthouse result, as shown below:

<details>

<summary>Post Fix Lighthouse Results<summary>

<img src="readme/a11y-performance/post-fixes-lighthouse.png">

</details>

## Known Bugs

- Although the progress bar does work for Firefox desktop users, it does not animate & transition to it's desination, nor is the color the intended color.





