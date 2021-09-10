import types from '../types';

export const watchListRequested = () => {
	return {
		type: types.FETCH_WATCHLIST_REQUEST
	};
};

export const idListLoaded = (data) => {
	return {
		type: types.FETCH_IDLIST_SUCCESS,
		payload: data
	};
};

export const watchListLoaded = (data) => {
	return {
		type: types.FETCH_WATCHLIST_SUCCESS,
		payload: data
	};
};

export const fetchUserRequestStarted = () => {
	return {
		type: types.FETCH_USER_REQUEST_STARTED
	};
};

export const movieAddedToWatchList = (data) => {
	return {
		type: types.MOVIE_ADDED_TO_WATCHLIST,
		payload: data
	};
};

export const movieRemovedFromWatchList = (data) => {
	return {
		type: types.MOVIE_REMOVED_FROM_WATCHLIST,
		payload: data
	};
};

export const watchListCleaned = () => {
	return {
		type: types.WATCHLIST_CLEANED
	};
};

export const userRequestStatusReset = () => {
	return {
		type: types.USER_REQUEST_STATUS_RESET
	}
};

export const fetchUserRequestError = () => {
	return {
		type: types.FETCH_USER_REQUEST_FAILURE
	};
};

export const watchListError = () => {
	return {
		type: types.FETCH_WATCHLIST_FAILURE
	}
}

export const fetchWatchList = ({ getMovieById, transformMovies }) => (idList) => async (dispatch) => {
	dispatch( watchListRequested() );

	try {
		const promisedMovieList = idList.map(getMovieById);
		const response = await Promise.all(promisedMovieList);
		const { results: transformedResponse } = transformMovies(response);
		dispatch( watchListLoaded(transformedResponse) );
	} catch(err) {
		dispatch( watchListError() );
	}
	
};

export const fetchWatchListIds = ({ getWatchListIds }) => (userId, token) => async (dispatch) => {
	try {
		const response = await getWatchListIds(userId, token);
		const data = response !== null ? Object.values(response) : [];

		dispatch( idListLoaded(data) );
	} catch(err) {
		dispatch( watchListError() );
	}
};

export const addMovieToWatchList = ({ addMovieToWatchList }) => (userId, token, movieId) => async (dispatch) => {

	try {
		await addMovieToWatchList(userId, movieId, token);
		dispatch( movieAddedToWatchList(movieId) );
	} catch(err) {
		dispatch( fetchUserRequestError() );
	}
};

export const removeMovieFromWatchList = ({ removeMovieFromWatchList }) => (userId, token, movieId) => async (dispatch) => {
	try {
		await removeMovieFromWatchList(userId, movieId, token);
		dispatch( movieRemovedFromWatchList(movieId) );
	} catch(err) {
		dispatch( fetchUserRequestError() );
	}
};