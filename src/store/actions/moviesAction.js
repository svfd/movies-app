import types from '../types';

export const moviesRequested = () => {
	return {
		type: types.FETCH_MOVIES_REQUEST
	};
};

export const moviesLoaded = (data) => {
	return {
		type: types.FETCH_MOVIES_SUCCESS,
		payload: data
	};
};

export const moviesError = () => {
	return {
		type: types.FETCH_MOVIES_FAILURE
	};
};

export const fetchMoviesByType = ({ getMoviesByType, transformMovies }) => (type, page) => async (dispatch) => {
	
	dispatch( moviesRequested() );

	try {
		const { results, total_pages } = await getMoviesByType(type, page);
		const transformedResponse = transformMovies(results, total_pages);
		dispatch( moviesLoaded(transformedResponse) );
	} catch {
		dispatch( moviesError() );
	}

};

export const fetchMoviesByGenre = ({ getMoviesByGenre, transformMovies }) => (id, page) => async (dispatch) => {
	
	dispatch( moviesRequested() );

	try {
		const { results, total_pages } = await getMoviesByGenre(id, page);
		const transformedResponse = transformMovies(results, total_pages);
		dispatch( moviesLoaded(transformedResponse) );
	} catch {
		dispatch( moviesError() );
	}

};

export const searchMovies = ({ searchMoviesByKeyword, transformMovies }) => (keyword, page) => async (dispatch) => {

	dispatch( moviesRequested() );

	try {
		const { results, total_pages } = await searchMoviesByKeyword(keyword, page);
		const transformedResponse = transformMovies(results, total_pages);
		dispatch( moviesLoaded( transformedResponse ));
	} catch(err) {
		dispatch( moviesError(err) );
	}

};