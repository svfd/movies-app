import types from '../types';

export const similarMoviesRequested = () => {
	return {
		type: types.FETCH_SIMILAR_MOVIES_REQUEST
	};
};

export const similarMoviesLoaded = (data) => {
	return {
		type: types.FETCH_SIMILAR_MOVIES_SUCCESS,
		payload: data
	}
};

export const similarMoviesError = () => {
	return {
		type: types.FETCH_SIMILAR_MOVIES_FAILURE
	};
};

export const fetchSimilarMovies = ({ getSimilarMovies, transformMovies }) => (id) => async (dispatch) => {

	dispatch( similarMoviesRequested() );

	try {
		const { results } = await getSimilarMovies(id);
		const transformedResponse = transformMovies(results);
		dispatch( similarMoviesLoaded(transformedResponse) );
	} catch {
		dispatch( similarMoviesError() );
	}

};