import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getWatchedById = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/watched.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const watchedResults = results.data;
      const watched = [];
      Object.keys(watchedResults).forEach((watchlistId) => {
        watchedResults[watchlistId].id = watchlistId;
        watched.push(watchedResults[watchlistId]);
      });
      resolve(watched);
    })
    .catch(err => reject(err));
});

const addToWatched = movie => axios.post(`${firebaseUrl}/watched.json`, movie);

const editRating = (movieId, ratedMovieObj) => axios.put(`${firebaseUrl}/watched/${movieId}.json`, ratedMovieObj);

export default {
  addToWatched, getWatchedById, editRating,
};
