# movie-history

# User Story
As a User, when I click the login with google button, I should be prompted with a google popup to pick which account to log in with.
# AC
**WHEN** The user clicks the google login button they should see a popup window with an option to log into the site with their google account
**THEN** They should be able to enter their gmail information to log into the site
# Development
* Make Project @ firebase
* @ firebase enable gmail login (authentication -> Sign in method -> gmail -> enable)
* go to project settings -> click the html icon (`</>`)
* back in the local project's console enter `npm install --save firebase`
* make a file named `apiKeys.json`, @ `src/javascripts/helpers`
* copy the part of the firebase info given on firebase with "apikey, authDomain, etc", and convert this into json data.
    * **IMPORTANT** YOU MUST ADD THIS FILE TO `.gitignore`, and import when needed
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