import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';
import watchlistData from '../../helpers/data/watchlistData';

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

const addToWatchlistEvent = (e) => {
  const movie = {
    imageUrl: $(e.target).closest('div').find('.img')[0].id,
    title: $(e.target).closest('div').find('.title')[0].id,
    uid: firebase.auth().currentUser.uid,
  };
  if (movie) {
    // add
    watchlistData.addToWatchlist(movie)
      .then(() => getMovies(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
      .catch(err => console.error('no update', err));
  }
  movieData.deleteMovie(movie)
    .then(() => getMovies(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const addEvents = () => {
  document.getElementById('navbar-button-addMovie').addEventListener('click', newMovieBtn);
  const watchlistButtons = document.getElementsByClassName('watchlist');
  for (let i = 0; i < watchlistButtons.length; i += 1) {
    watchlistButtons[i].addEventListener('click', addToWatchlistEvent);
  }
};

const domStringBuilder = (movies, watchlist) => {
  let domString = '';
  domString += '<div class="row text-center">';
  movies.forEach((movie) => {
    domString += `<div id="${movie.id}"class="card col-3" style="width: 20rem;">`;
    domString += `<h3 id="${movie.title}" class="title">${movie.title}</h3>`;
    domString += `<img class="img" id="${movie.imageUrl}" src="${movie.imageUrl}" alt="birthday location"/>`;
    domString += `<button id="${movie.id}" class="btn btn-danger watchlist">Add to Watchlist</button>`;
    domString += '</div>';
  });
  watchlist.forEach((movie) => {
    domString += `<div id="${movie.id}"class="card col-3" style="width: 20rem;">`;
    domString += '<h2>WATCHLIST</h2>';
    domString += `<h3 id="${movie.title}" class="title">${movie.title}</h3>`;
    domString += `<img class="img" id="${movie.imageUrl}" src="${movie.imageUrl}" alt="birthday location"/>`;
    domString += `<button id="${movie.id}" class="btn btn-danger watchlist">Add to Watchlist</button>`;
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('event', domString);
  addEvents();
};

const getMovies = (uid) => {
  movieData.getAllMoviesByUid(uid)
    .then((movies) => {
      watchlistData.getWatchlistById(uid).then((watchlist) => {
        // movieData.getWatchlistById(watchlist);
        console.error(watchlist);
        domStringBuilder(movies, watchlist);
      });
    })
    .catch(err => console.error('no movies', err));
};

export default { getMovies };
