import types from '../types';

export const genresRequested = () => {
	return {
		type: types.FETCH_GENRES_REQUEST
	};
};

export const genresLoaded = (data) => {
	return {
		type: types.FETCH_GENRES_SUCCESS,
		payload: data
	};
};

export const genresError = () => {
	return {
		type: types.FETCH_GENRES_FAILURE
	};
};

export const fetchMoviesGenres = ({ getMoviesGenres }) => () => async (dispatch) => {

	dispatch( genresRequested() );

	try {
		const response = await getMoviesGenres();
		dispatch( genresLoaded(response) );
	} catch {
		dispatch( genresError() );
	}

};