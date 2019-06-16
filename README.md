# movie-history

## Description
A website to keep track of movies and their shooting locations.

## Screenshots
https://raw.githubusercontent.com/GitMullins/movie-history/master/src/img/screenshot.PNG

## Installation Instructions
* Clone down this repo
* at the root of a project, run `npm install`

## How to Run
* In your terminal type `npm start`

If you want to make a production build of this project, type `npm run build`. This will create a folder called build with all the minified code you need.

## Author
David Mullins






``` JSON
{
  "firebaseKeys": {
    "apiKey": "sorryNotARealApiKey",
    "authDomain": "example.firebaseapp.com",
    "databaseURL": "https://example.firebaseio.com",
    "projectId": "example-123456789",
    "storageBucket": "example-666.google.com",
    "messagingSenderId": "123456789",
    "appId": "123456789"
  }
}
```
* (Add a file named `apiKeys.example.json` with empty values for reference.)
* inside `auth.js`, and `main.js`, on top of the file `import firebase from 'firebase/app';`, and `import 'firebase/auth';`
* in `auth.js` make a new function named `signMeIn()` which will call a popup window to log into google when called
```
const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};
```
* add an event listener that calls `signMeIn()`  when your login button is clicked
* export if needed
* Inside `main.js`,  `import apiKeys from './helpers/apiKeys.json';`
* inside your init function call `firebase.initializeApp(apiKeys.firebaseKeys);`
* You will now get a popup box when the login button is clicked, but when you log in the browser throws an error. If you follow that link, and use your email address as the customer support email, and accept you should be able to log in successfully.