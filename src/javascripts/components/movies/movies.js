import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    imageUrl: document.getElementById('imageUrl').value,
    title: document.getElementById('title').value,
    uid: firebase.auth().currentUser.uid,
  };
  movieData.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('imageUrl').value = '';
      document.getElementById('title').value = '';
      document.getElementById('movies').classList.remove('hide');
      document.getElementById('new-movie').classList.add('hide');
      getMovies(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new friend for you', err));
};


const newMovieBtn = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};

const addEvents = () => {
  document.getElementById('navbar-button-addMovie').addEventListener('click', newMovieBtn);
};

const domStringBuilder = (movies) => {
  let domString = '';
  domString += '<div class="row text-center">';
  movies.forEach((movie) => {
    domString += '<div class="card col-4" style="width: 20rem;">';
    domString += `<h3>${movie.title}</h3>`;
    domString += `<img src="${movie.imageUrl}" alt="birthday location"/>`;
    domString += '<button class="btn btn-danger">Add to Watchlist</button>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('event', domString);
  addEvents();
};

const getMovies = () => {
  movieData.getAllMovies()
    .then((movies) => {
      domStringBuilder(movies);
    })
    .catch(err => console.error('no movies', err));
};

export default { getMovies };
