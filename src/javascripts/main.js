import firebase from 'firebase/app';
import auth from './components/auth/auth';
import myNavBar from './components/myNavBar/myNavBar';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';

import 'bootstrap';
import '../styles/main.scss';
import '../styles/movies.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  myNavBar.navbarEvents();
  authData.checkLoginStatus();
  auth.domStringBuilder();
};

init();
