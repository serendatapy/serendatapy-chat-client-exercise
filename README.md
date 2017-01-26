# Chat Client

In a few weeks you’re going to be senior students… so it’s time to exit the walled garden of prepared exercises. For this project you have an empty repo and need to build everything yourself.

Make a chat client that loads in the browser, and looks like a typical message app. These are the requirements:

- The UI is divided in 3 parts. On the left side there are messages from other users. On the right side there are messages you wrote. On the bottom there’s an input with a button to send new messages.
- Your messages and the other users’ messages should have different background colors, come in a nice bubbly shape, and auto scroll to keep the relevant content on the screen as new messages come in.
- Automatically load new messages from other users, grabbing them from this [quotes API](http://forismatic.com/en/api/). The messages should come in at random intervals within a time range of your choice.

To make the requests to the API install and use [jQuery](http://jquery.com/download/) (you can save it as a dependency through [Bower](https://bower.io/), or import it from the CDN).

First try to get your external quotes using [Ajax](http://api.jquery.com/jquery.ajax/). You will notice that the requests get blocked because there’s no [CORS](https://developer.mozilla.org/en/docs/Web/HTTP/Access_control_CORS) header. So, consider switching to JSONP and check the difference.

Make sure to make small, incremental, and descriptive commits along the way. Before committing check your syntax through `gulp lint`.

## Getting started

To install the required dependencies run `npm install`.

Now create 3 files in the `/app` folder:

- `index.html` - Includes your HTML structure, and the imports for any other required resources (e.g. scripts and CSS).
- `style.css` - This is where your CSS rules go.
- `script.js` - Here you add any JavaScript code for the client.

Now you can run the `gulp` command from the project folder: this will open the browser on `index.html`, and automagically reload the page any time you modify the HTML, CSS, or JS file (if you want to disable automatic syncing, you can do it from the control panel at `http://localhost:3001/sync-options`).

## Extra credits

- Add unit tests in the `/test` folder. First you’ll need to install [Jasmine](https://jasmine.github.io/) and save it as a [dev-dependency](https://docs.npmjs.com/cli/install) in your project (read the docs and see how it works). In the same way, to test your DOM you can use [jsdom](https://github.com/tmpvar/jsdom).
- Improve the look and feel of your UI, go fancy, make it sexy!
