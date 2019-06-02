import firebase from 'firebase/app';
import 'firebase/auth';
import movies from '../../components/movies/movies';

const authDiv = document.getElementById('auth');
const birfdayDiv = document.getElementById('movies');
const birfdayNavbar = document.getElementById('navbar-button-birthday');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const addMovieNavbar = document.getElementById('navbar-button-addMovie');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      birfdayDiv.classList.remove('hide');
      birfdayNavbar.classList.remove('hide');
      addMovieNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      movies.getMovies(user.uid);
    } else {
      authDiv.classList.remove('hide');
      birfdayDiv.classList.add('hide');
      birfdayNavbar.classList.add('hide');
      addMovieNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
