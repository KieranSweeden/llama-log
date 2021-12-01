# Llama Log

-- Brief introduction to application

-- Am I Responsive image demonstrating app responsiveness

-- Link to heroku deployment of application

## Contents

<hr>

## UX Design

### Strategy

#### The Problem

In the workplace, communication can be a challenge. This can especially be the case when particular colleague's shift patterns don't collide, meaning they cannot communicate physically to one another. This can be a problematic issue concerning equipment-based work orders or incidents within the workplace, as the colleague who is aware of the work order/incident may fail to inform their fellow colleagues of it. In the future, another colleague may have to tackle the given work order/incident and due to the previous colleague not informing others of the situation, the current colleague may not be able to solve the situation in the most effective & efficient manner.

#### The Costs

This lack of communication can lead to financial costs to the business in logging multiple work orders, or reputational costs due to poor customer service, as colleagues were not better informed of a particular situation and are therefore portrayed as unprofessional in the eyes of a customer.

#### The Solution

Llama Log's goal is to improve communication between colleague's within a given work environment, allowing for better management over equipment-based work orders and incidents in the workplace.

It's goal is to act as the central hub where employee's can store information regarding particular work orders and incidents. Employee's can then refer to Llama Log whenever they may need to be fully informed of a situation that's previous occured, enabling them to act upon it effectively in the present.

#### The Difference

Communication in the workplace is a problem that's been tackled with the use of software many times, so what will make Llama Log different?

Llama Log will feature a user interface that will not assume that the user is tech-savvy. It will sport a visual language that's familiar, readable and economic to the end user, inspiring them to continue using the application which'll then aid them in achieving their work-related targets. It's design will be inspired by the social media giant [Facebook](https://www.facebook.com/), as "many marketers report that Facebook is the most effective platform for reaching an older demographic", according to ["How over 50s use social media and the internet"](https://www.digital22.com/insights/how-over-50s-use-social-media-and-the-internet) by Molly Johnston. This will aid Llama Log in being familiar to older users who are less technically inclined, increasing the likelihood that they'll repeatedly use the application.

#### User Goals

Llama Log can help employee's achieve goals such as:

- Providing outstanding customer service consistently.
- Directing visiting engineers towards the source of a equipment-related issue, fixing the issue in a timely manner.
- Communicating effectively with colleagues that they may not work with on a regular basis.

#### Business Goals

Llama Log can help businesses achieve goals such as:

- Saving money by fixing equipment on the first call and not having to make multiple calls to solve a singular issue.
- Creating a collaborative working environment for colleagues, building on their communication skills and confidence when tackling situations they're not fully informed on.
- Store data on the most common equipment faults in the workplace, allowing them to make better informed decisions when purchasing equipment in the future.
- Store data regarding the most common incidents with customers, enabling the business to create relevant learning materials for colleagues regarding such incidents.

#### Opportunities

Below is a table containing a list of opportunities that Llama Log could potentially provide:

| Opportunity/Problem                   | Importance | Feasability |
|---------------------------------------|:----------:|:-----------:|
| Register Employee (Admin)             |      5     |      4      |
| Log In (Admin & Employee)             |      5     |      4      |
| 404 Page                              |      5     |      5      |
| Create & Edit Post (Admin & Employee) |      5     |      5      |
| Comment on Post (Admin & Employee)    |      3     |      3      |
| Responsive Design                     |      3     |      4      |
| Archive Post (Employee)               |      4     |      5      |
| Delete Archived Post (Admin)          |      4     |      3      |
| Form Validation for WO's & Incidents  |      5     |      5      |
| Admin Database Queries                |      2     |      3      |
| Search previous posts                 |      4     |      4      |

Considering that enhancing the communication between colleague's is the essential goal that Llama Log is aiming for, any opportunities that do not directly contribute to this minimum goal will be postponed for a later release of Llama Log.

The opportunity that stands out here in not directly contributing to Llama Log's main goal is Admin Database Queries, which is a feature that enables admins to query data within the database of posts made by colleagues, that could suggest trends in the workplace that the business can act upon. This feature will be postponed and will therefore not make it into the MVP of Llama Log.

[Return to Contents &#8679;](#Contents)

### Scope

#### User Requirements

So what would employee's say they need from Llama Log? Employee's need to be able to input information surrounding a work order/incident quickly, so they can promptly return to a task they've currently been assigned to in the workplace. An input form shouldn't contain lots of input fields, nor should it present input fields irrelevant to the employee''s current situation, an example being a work order number input field when the employee is actually attempting to log a situation involving a customer.

The usefulness of Llama Log will be largely dependent on how quick the employee is able to create & read information. Therefore upon logging in, both pieces of functionality need to be present to the employee immediately.

Employee's will likely be reading information in the past and providing employee's are actively using the application, the amount of information will likely build up to a point so much so, that employee's will have to scroll down continuously through vast amounts of information that's irrelevant to them. This can quickly become a tedious and slow workflow, providing a bad user experience. For this reason, a search input field should be immediately present upon logging in. This will enable employee's to promptly search for the information they're looking for.

What they may not know they need however is data validation. The employee will need to insert data into all input fields within the form, in order to make the information regarding a work order/incident useful to themselves or their colleague's in the future. It's important to remember with this in mind not to overload the employee with input field's, as they may not have the time or patience to fill in every minor detail.

#### User Stories

**As an Employee using Llama Log, I'd expect to:**

- Be prompted to create a password when I first log in.
- Immediately see the live feed of posts when logging into the app.
- Quickly be able to create a new post when logging into the app.
- Be given an input form that's relevant to my current situation when creating a post.
- Quickly search for previous posts using a search field.
- Edit a post I've previously made.
- Archive posts I've previously made.
- Have a basic avatar image linked to my icon to personalise my account.

**As an Admin, I'd expect Llama Log to enable me in:**

- Creating new employee & admin user accounts.
- Deleting employee & admin user accounts.
- Editing all fields relating to an employee account (except password).
- Completely deleting posts that employee's have archived.

**As a user of Llama Log, I'd expect to:**

- Log in to the app promptly.
- Immediately know what the app is about prior to logging in.
- Be familiar with it's design, so it's easily learnable.
- Immediately tell which information is important based on visual language alone.

#### Current Features

In order to help both employee's and businesses achieve their respective goals, Llama Log in it's MVP stage will contain the following features:

- A log in page upon first opening the application, instructing the user to log in with a brief description of the app alongside the log in form.
- A familiar home page, featuring a live feed of posts made by employee's at the center, search field at the top, user name & avatar at the top right and create new post call to action button at the top of the live feed.
- A user account management page for admins, where they're able to create, view, update or delete employee & admin accounts.
- An error page that redirects the user back to the home page containing their live feed.
- A search input field that allows the user to search though the titles and descriptions within previous posts using keywords.
- Posts that the user has created can be edited, however posts created by others cannot.
- When creating a new post, the user will decide between a work order or incident, both containing their respective input fields.
- Data validation on all input fields, to prevent missing information that could be of use and consistent look when posts are viewed.

#### Future Features

The features listed below don't directly tackle the problems Llama Log is attempting to resolve, therefore they will not make it into the MVP of Llama Log. Given that they would enhance the usability of Llama Log however, they will be implemented within a future release of the application.

- A database query page that allows admins to compile mass sums of data taken from posts employee's have made, which could be of use to other sectors within the business.
- Post history page, that presents the history of a post. This allows users to see previous iterations of a post if it's been edited on multiple occasions.

[Return to Contents &#8679;](#Contents)

### Structure

The entry point of the application should be a log in page, as this will immediately direct the user to sign in and interact with the application. This is more inline with Llama Log's goal as an application, rather than being directed to a general home page and having to make an additional button click to another page in order to sign in to the application.

An overall and visual look of the structure & page direction of Llama Log can be found below:

<img src="readme/ux/llama-log-sitemap.png">

A more thorough walkthrough of each page can be seen below.

#### External Pages

The following pages are the only ones available whilst the user is not signed in.

<details>

<summary><strong>index.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to log in page
    - Log In (Active) - Informs user they're on the log in page & reloads page when clicked.
    - About Us - Directs user to about page

- Features
    - A login form, where the user can input their user ID & password in order to gain access to Llama Log's functionality.
    - Image & brief info about the application on the left side of the form (Desktop screens only)

</details>

<details>

<summary><strong>about.html</strong></summary>

The about page will provide information regarding Llama Log, informing the user of the application's goals and how it can benefit the user's business.

The about page would only be useful to those who are not adopting Llama Log within their business, therefore this page will only be available to users who are not signed in. This will also reduce the amount of elements in the navbar, reducing the visual complexity of the app, ensuring a friendly and efficient user experience for non-tech savvy users.

- Navbar links
    - Logo Image - Directs user to the log in page
    - Log In - Directs user to the log in page
    - About Us (Active) - Informs user they're on the about page & reloads page when clicked.

</details>

#### Internal Pages

The following pages are the only ones available whilst the user is signed in.

<details>

<summary><strong>new_user.html</strong></summary>

Navbar links will be removed at this stage within the application to reduce the chance of the user entering the application without a password.

- Navbar links
    - Logo Image - Directs user to the log in page

- Features
    - Displays a form asking the user to create a new password, with the requirements of a password clearly present.
    - User must enter password twice to validate it's correct and no type errors were made.

</details>

<details>

<summary><strong>feed.html</strong></summary>

The home page will contain the live feed of posts made by themselves and other users. This page's design will be influenced by that sported by Facebook, as it's the page the user will find themselves within more often than others. This means it's important that this page features a familiar design, inspiring confidence within the user that they can operate the user interface, performing desired functions such as creating a post or finding a previous post.

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed (Active) - Informs user they're on the feed page & reloads page when clicked.
    - Account - Directs user to the manage account page
    - Manage (Admin only) - Directs user to the manage page

- Features
    - At the top of the feed whilst below the navbar there will be two buttons, Search & Create Post. Both providing their respective functionalities with supporting icons that make it learnable.
    - Posts presented in a live feed at the centre of the page, sorted by time of creation. Each post will present enough information so that the user can clearly identify the topic and click view post to open it fully on an isolated page (view_post.html). Having a limit to the size of a post due to the amount of text within will maintain a readable and user-friendly UX, as posts so large can be a chore to scroll down from.
    - Posts within the live feed are also color coded, so that the posts can easily be distinguished as work orders & incidents will be given unique colors respectively. It's important however that these colors are not too vibrant & drastic, as the UI would be intense to look at resulting in a poor UX. Too many vibrant colors would also provide a playful feel to the app, which contradicts the intention of the application being used within a business context. Therefore it's important to be conservative & clinical about the choice of colors used for each category.

</details>

<details>

<summary><strong>create_post.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed - Directs user to the feed page
    - Account - Directs user to the manage account page
    - Manage (Admin only) - Directs user to the manage page

- Features
    - A header that informs the user as to where they are.
    - Page opens with two large buttons asking the user what type of post are they looking to create, work order or incident. Both category buttons featuring a less saturated shade of their respective colors, which turns to the original shade when clicked and directs the user to a create new post form that's suited to their chosen category.
    - Form validation that's immediately present to the user, rather than informing them when attempting to submit a post.

</details>

<details>

<summary><strong>view_post.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed - Directs user to the feed page
    - Account - Directs user to the manage account page
    - Manage (Admin only) - Directs user to the manage page

- Features
    - A header that informs the user as to where they are.
    - User is able to view post in isolation from other posts & view all comments underneath.
    - A colleague user is able to comment on the post their viewing, which can be their own or someone else's.
    - Provided the user is the author of the post, they are able to edit the post by clicking the edit button, directing them to edit_post.html. If they're not the author of the post, the edit button will not appear.
    - Admins are not able to edit posts that are not their own either, however they are able to archive them.

</details>

<details>

<summary><strong>edit_post.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed - Directs user to the feed page
    - Account - Directs user to the manage account page
    - Manage (Admin only) - Directs user to the manage page

- Features
    - A header that informs the user as to where they are.
    - A form presents itself to the user with all fields pre-filled with the data taken from the database.
    - User is able to edit the post in it's entirety.
    - Data validation is still immediately present, making sure the user doesn't insert incorrect information.

</details>

<details>

<summary><strong>account.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed - Directs user to the feed page
    - Account (Active) - Directs user to the manage account page
    - Manage (Admin only) - Directs user to the manage page

- Features
    - A small card presents itself to the user, presenting the user's information.
    - User is able to modify and update fields within their account.

</details>

<details>

<summary><strong>manage.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed - Directs user to the feed page
    - Account - Directs user to the manage account page
    - Manage (Admin only) (Active) - Directs user to the manage page

- Features
    - Displays list of users to admin, each user list item featuring it's respective edit & delete button.
    - Edit button for each list item directs the user to edit_user.html with that user's info pre-filled within a form ready for editing.
    - Admin is able to delete account without exiting the page. Defensive UX should be in place however, making sure the user really wants to delete the user.
    - A create new user button at the top of the list of existing user accounts, directing the user to create_user.html.


</details>

<details>

<summary><strong>create_user.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed - Directs user to the feed page
    - Account - Directs user to the manage account page
    - Manage (Admin only) (Active) - Directs user to the manage page

- Features
    - Displays a form to the admin, where they can enter a new user's information. Password is excluded from this form, as the user will get to create that themselves when entering their e-mail.
    - All fields within the form will be required, to ensure data is consistent within the database.
    - Data validation will be immediately present, creating a seamless UX and not frustrating the admin when creating a new user.

</details>

<details>

<summary><strong>edit_user.html</strong></summary>

- Navbar links
    - Logo Image - Directs user to the home page
    - Feed - Directs user to the feed page
    - Account - Directs user to the manage account page
    - Manage (Admin only) (Active) - Directs user to the manage page

- Features
    - Displays the same form as the one in create_user.html, except the form is pre-filled with user information.
    - All fields within the form will be required, to ensure data is consistent within the database.
    - Data validation will be immediately present, creating a seamless UX and not frustrating the admin when creating a new user.

</details>

#### Database Schema

The database for Llama Log will be hosted via [MongoDb](https://www.mongodb.com/) and the collections within the database are:

> Note: The ID field for each collection is the primary key & increments on each instance.

- Users
    - Contains personal & account oriented data regarding a user.
    - The admin field will contain boolean values, interactivity for the user will be restricted depending on these values.

- Posts
    - Contains the text content within the post, user that wrote the post (author) and a list of comments linked to the post.
    - Contains date_created field so posts can be sorted by date in feed page.
    - The categories field has a many-to-one relationship with documents within the categories collection. A post can only have one category associated with it, whereas a category can have many posts associated with it.
    - The comments field has a one-to-many relationship with documents within the comments collection. A post can have many comments, however a comment can only have one parent post.

- Comments
    - Contains the comment content itself, the author & date created.
    - The post field has a many-to-one relationship with the _id field of posts, as a post can have many comments, whereas a comment can only have one parent post.
    - The _id field has a many-to-one relationship with the comments field within the posts collection, as a post can have many comments, however a comment can only have one parent post.
     
- Categories
    - Contains a primary id primary key field along with the name of the categories.

The database schema is as follows:

<img src="readme/ux/llama-log-db-schema.png">

[Return to Contents &#8679;](#Contents)

### Skeleton

#### Wireframes

##### Mobile

<details>

<summary>Index page (existing user)</summary>

<img src="readme/ux/wireframes/index-mobile-existing-user.png">

</details>

<details>

<summary>Index & new password page (new user)</summary>

<img src="readme/ux/wireframes/index-mobile-new-user.png">

</details>

<details>

<summary>About page</summary>

<img src="readme/ux/wireframes/about-mobile.png">

</details>

<details>

<summary>Feed page</summary>

<img src="readme/ux/wireframes/feed-mobile.png">

</details>

<details>

<summary>View post page</summary>

<img src="readme/ux/wireframes/view-post-mobile.png">

</details>

<details>

<summary>Create post page</summary>

<img src="readme/ux/wireframes/create-mobile.png">

</details>

<details>

<summary>Edit post page</summary>

<img src="readme/ux/wireframes/edit-mobile.png">

</details>

<details>

<summary>View account page</summary>

<img src="readme/ux/wireframes/account-mobile.png">

</details>

<details>

<summary>Manage Users page</summary>

<img src="readme/ux/wireframes/manage-mobile.png">

</details>

<details>

<summary>Create & edit users pages</summary>

<img src="readme/ux/wireframes/create-edit-user-mobile.png">

</details>

##### Tablet

<details>

<summary>Index page (existing user)</summary>

<img src="readme/ux/wireframes/index-tablet-existing-user.png">

</details>

<details>

<summary>Index & new password page (new user)</summary>

<img src="readme/ux/wireframes/index-tablet-new-user.png">

</details>

<details>

<summary>About page</summary>

<img src="readme/ux/wireframes/about-tablet.png">

</details>

<details>

<summary>Feed page</summary>

<img src="readme/ux/wireframes/feed-tablet.png">

</details>

<details>

<summary>View post page</summary>

<img src="readme/ux/wireframes/view-post-tablet.png">

</details>

<details>

<summary>Create post page</summary>

<img src="readme/ux/wireframes/create-tablet.png">

</details>

<details>

<summary>Edit post page</summary>

<img src="readme/ux/wireframes/edit-tablet.png">

</details>

<details>

<summary>View account page</summary>

<img src="readme/ux/wireframes/account-tablet.png">

</details>

<details>

<summary>Manage Users page</summary>

<img src="readme/ux/wireframes/manage-tablet.png">

</details>

<details>

<summary>Create & edit users pages</summary>

<img src="readme/ux/wireframes/create-edit-user-tablet.png">

</details>

##### Desktop

<details>

<summary>Index page (existing user)</summary>

<img src="readme/ux/wireframes/index-desktop-existing-user.png">

</details>

<details>

<summary>Index & new password page (new user)</summary>

<img src="readme/ux/wireframes/index-desktop-new-user.png">

</details>

<details>

<summary>About page</summary>

<img src="readme/ux/wireframes/about-desktop.png">

</details>

<details>

<summary>Feed page</summary>

<img src="readme/ux/wireframes/feed-desktop.png">

</details>

<details>

<summary>View post page</summary>

<img src="readme/ux/wireframes/view-post-desktop.png">

</details>

<details>

<summary>Create post page</summary>

<img src="readme/ux/wireframes/create-desktop.png">

</details>

<details>

<summary>Edit post page</summary>

<img src="readme/ux/wireframes/edit-desktop.png">

</details>

<details>

<summary>View account page</summary>

<img src="readme/ux/wireframes/account-desktop.png">

</details>

<details>

<summary>Manage Users page</summary>

<img src="readme/ux/wireframes/manage-desktop.png">

</details>

<details>

<summary>Create & edit users pages</summary>

<img src="readme/ux/wireframes/create-edit-user-desktop.png">

</details>

[Return to Contents &#8679;](#Contents)

### Surface

#### Visual Language

A visual language should be created & utilised within Llama Log, to convey information to the user without having to tell them the information. Making this language simple makes it learnable to the user and de-clutters the page, making the overall UX more user friendly.

##### Colour

Considering the target audience, Llama Log requires a conservative approach to the colour scheme to provide it with a professional appearance.

The chosen primary colour for Llama Log is mix between green and blue, darkened enough to conform to WCAG guidelines. Given green's association with emotion's such as [safety & optimism](https://www.verywellmind.com/color-psychology-green-2795817) and blue's association with [stability & productivity](https://www.verywellmind.com/the-color-psychology-of-blue-2795815), this felt like a good metaphorical fit when taking Llama Log's goals into account.

Experimenting with [Coolors](https://coolors.co/), I came up with the following colour scheme:

- Primary: hsl(178, 75, 20)
- Black: hsl(0, 0, 12)
- White: hsl(0, 0, 98)

<img src="readme/ux/llama-log-colour-scheme.png">

The colours within the colour scheme all follow WCAG web accessibility guidelines as shown below:

<details>

<summary>Show contrast checker results</summary>

<img src="readme/ux/llama-log-a11y-primary-on-white.png">

<img src="readme/ux/llama-log-a11y-black-on-white.png">

<img src="readme/ux/llama-log-a11y-white-on-black.png">

</details>

##### Typography

Keeping with the conservative approach previously mentioned during the development process of this plane, Llama Log should only sport one font family. However this font family will have multiple bold variances, providing us with the ability to inform the user on the importance of content based on it's boldness, improving the visual language of the application.

The font family chosen for Llama Log is [Lexend](https://fonts.google.com/specimen/Lexend?preview.text=Llama%20Log&preview.text_type=custom&query=lexend) which was created for reading proficiency purposes, tackling visual stress, helping those with dyslexia & others that struggle with reading. 

<img src="readme/ux/llama-log-lexend.png">

Utilising this font family along with the chosen colour scheme will aid Llama Log in being as visually accessibile as possible.

[Return to Contents &#8679;](#Contents)

<hr>

## Technology

### Applications

The following applications were utilised during the development of Llama Log:

- [Balsamiq](https://balsamiq.com/)
    - Balsamiq was utilised to create the wireframes during the skeleton plane UX development phase of Llama Log.

- [Tables Generator](https://www.tablesgenerator.com/markdown_tables)
    - Tables generator was utilised to quickly create tables within this README markdown file.

- [dbdiagram.io](https://dbdiagram.io/home)
    - dbdiagram was utilised to create entity relationship diagrams in order to clearly visualize the database structure of Llama Log & the relationship contained within it.

[Return to Contents &#8679;](#Contents)

<hr>

## Testing

[Return to Contents &#8679;](#Contents)

<hr>

## Deployment

[Return to Contents &#8679;](#Contents)

<hr>

## Credits

[Return to Contents &#8679;](#Contents)

<hr>

## Acknowledgements

[Return to Contents &#8679;](#Contents)

<hr>