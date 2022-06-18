This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
also
### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Main view

The main view contains a header with the _Sort criteria selector_ (left corner),
as well as a _category navigator_ (right corner). Changing the sort criteria
causes an instant re-render. Changing the category filter requires clicking on
the arrow to navigate to the desired category. Clicking on the main title:
*Blog* takes you to the main page.

The main view contains a small summary of the posts as well as clickable area to
create a new post from scratch. It's possible to upvote/downvote each post, as
well as edit or delete them. Multiple upvotes/downvotes are permitted. Clicking
on the post title redirects the user to a detailed view of the post, including
its comments.

From that view the user may also edit/delete the post, as well as
upvote/downvote it. Comments (if any) are listed. It's possible for the user
to add a new comment as well as upvote/downvote each comment. Deleteing or
editing the posts is also possible. Editing the comments is done in a modal
within the same page.

If a user is creating a new post he will be shown a form in a new view with
the fields to fill.
