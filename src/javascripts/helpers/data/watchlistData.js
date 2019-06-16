import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getWatchlistById = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/watchlist.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const watchlistResults = results.data;
      const watchlist = [];
      Object.keys(watchlistResults).forEach((watchlistId) => {
        watchlistResults[watchlistId].id = watchlistId;
        watchlist.push(watchlistResults[watchlistId]);
      });
      resolve(watchlist);
    })
    .catch(err => reject(err));
});

const addToWatchlist = movie => axios.post(`${firebaseUrl}/watchlist.json`, movie);

const deleteMovie = movieId => axios.delete(`${firebaseUrl}/watchlist/${movieId}.json`);

export default {
  addToWatchlist, getWatchlistById, deleteMovie,
};
