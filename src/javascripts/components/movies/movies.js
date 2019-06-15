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
  movieData.deleteMovie(e.target.id);
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
};

const deleteWatchlistMovieEvent = (e) => {
  watchlistData.deleteMovie(e.target.id)
    .then(() => getMovies(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('delete watchlist err', err));
};

const rateMovieEvent = (e) => {
  // console.error(e.target.id);
  document.getElementById(e.target.id).classList.add('hide');
  // console.error(document.getElementById(e.target.id));
  const id = e.target.id.split('.')[1];
  console.error(`stars.${id}`);
  // document.getElementsByClassName(`stars.${id}`).classList.remove('hide');
  document.getElementById(`rate1.${id}`).classList.remove('hide');
  document.getElementById(`rate2.${id}`).classList.remove('hide');
  document.getElementById(`rate3.${id}`).classList.remove('hide');
  document.getElementById(`rate4.${id}`).classList.remove('hide');
  document.getElementById(`rate5.${id}`).classList.remove('hide');
};

const addEvents = () => {
  document.getElementById('navbar-button-addMovie').addEventListener('click', newMovieBtn);
  const watchlistButtons = document.getElementsByClassName('watchlist');
  for (let i = 0; i < watchlistButtons.length; i += 1) {
    watchlistButtons[i].addEventListener('click', addToWatchlistEvent);
  }
  const deleteButtons = document.getElementsByClassName('delete');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteWatchlistMovieEvent);
  }
  const editButtons = document.getElementsByClassName('rate');
  for (let i = 0; i < editButtons.length; i += 1) {
    editButtons[i].addEventListener('click', rateMovieEvent);
  }
};

const domStringBuilder = (movies, watchlist) => {
  let domString = '';
  domString += '<div class="row text-center">';
  movies.forEach((movie) => {
    domString += `<div id="${movie.id}" class="card col-3" style="width: 50rem;">`;
    domString += `<h3 id="${movie.title}" class="title">${movie.title}</h3>`;
    domString += `<img class="img" id="${movie.imageUrl}" src="${movie.imageUrl}" alt="birthday location"/>`;
    domString += `<button id="${movie.id}" class="btn btn-danger watchlist">Add to Watchlist</button>`;
    domString += '</div>';
  });
  domString += '</div>';
  let watchlistBuilder = '';
  watchlistBuilder += '<div class="row text-center">';
  watchlist.forEach((movie) => {
    watchlistBuilder += `<div id="${movie.id}" class="card col-3" style="width: 50rem;">`;
    watchlistBuilder += '<h2>WATCHLIST</h2>';
    watchlistBuilder += `<h3 id="${movie.title}" class="title">${movie.title}</h3>`;
    watchlistBuilder += `<img class="img" id="${movie.imageUrl}" src="${movie.imageUrl}" alt="birthday location"/>`;
    watchlistBuilder += `<button id="${movie.id}" class="btn btn-danger delete">DELETE</button>`;
    watchlistBuilder += `<button id="rate.${movie.id}" class="btn btn-sm btn-warning rate">RATE</button>`;
    watchlistBuilder += `<button id="rate1.${movie.id}" class="hide stars.${movie.id} btn btn-sm btn-warning">1 &#9733</button>`;
    watchlistBuilder += `<button id="rate2.${movie.id}" class="hide stars.${movie.id} btn btn-sm btn-warning">2 &#9733</button>`;
    watchlistBuilder += `<button id="rate3.${movie.id}" class="hide stars.${movie.id} btn btn-sm btn-warning">3 &#9733</button>`;
    watchlistBuilder += `<button id="rate4.${movie.id}" class="hide stars.${movie.id} btn btn-sm btn-warning">4 &#9733</button>`;
    watchlistBuilder += `<button id="rate5.${movie.id}" class="hide stars.${movie.id} btn btn-sm btn-warning">5 &#9733</button>`;
    watchlistBuilder += '</div>';
  });
  watchlistBuilder += '</div>';
  util.printToDom('moviesDiv', domString);
  util.printToDom('watchlistDiv', watchlistBuilder);
  addEvents();
};

const getMovies = (uid) => {
  movieData.getAllMoviesByUid(uid)
    .then((movies) => {
      watchlistData.getWatchlistById(uid).then((watchlist) => {
        domStringBuilder(movies, watchlist);
      });
    })
    .catch(err => console.error('no movies', err));
};

export default { getMovies };
