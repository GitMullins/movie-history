import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewMovie = movieObject => axios.post(`${firebaseUrl}/movies.json`, movieObject);

const getAllMoviesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const movieResults = results.data;
      const movies = [];
      Object.keys(movieResults).forEach((movieId) => {
        movieResults[movieId].id = movieId;
        movies.push(movieResults[movieId]);
      });
      resolve(movies);
    })
    .catch(err => reject(err));
});

const deleteMovie = movieId => axios.delete(`${firebaseUrl}/movies/${movieId}.json`);

export default { getAllMoviesByUid, addNewMovie, deleteMovie };
