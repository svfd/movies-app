import { combineReducers } from 'redux';

import menu from './menuReducer.js';
import movies from './moviesReducer.js';
import movieDetails from './movieDetailsReducer.js';
import movieTrailers from './movieTrailersReducer.js';
import movieImages from './movieImagesReducer.js';
import movieReviews from './movieReviewsReducer.js';
import movieCast from './movieCastReducer.js';
import similarMovies from './similarMoviesReducer.js';
import genres from './genresReducer.js';
import auth from './authReducer.js';
import watchList from './watchListReducer.js';
import person from './personReducer.js';
import personCredits from './personCreditsReducer.js';

const reducer = combineReducers({
	menu,
	movies,
	movieDetails,
	movieTrailers,
	movieImages,
	movieReviews,
	movieCast,
	similarMovies,
	genres,
	auth,
	watchList,
	person,
	personCredits
});

export default reducer;