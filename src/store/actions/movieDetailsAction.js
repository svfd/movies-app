import types from '../types';

export const detailsRequested = () => {
	return {
		type: types.FETCH_SINGLE_MOVIE_REQUEST
	};
};

export const detailsLoaded = (data) => {
	return {
		type: types.FETCH_SINGLE_MOVIE_SUCCESS,
		payload: data
	};
};

export const detailsError = () => {
	return {
		type: types.FETCH_SINGLE_MOVIE_FAILURE
	};
};

export const fetchSingleMovie = ({ getMovieById, transformMovie }) => (id) => async (dispatch) => {
	
	dispatch( detailsRequested() );

	try {
		const response = await getMovieById(id);
		const transformedResponse = transformMovie(response);
		dispatch( detailsLoaded(transformedResponse) );
	} catch(err) {
		dispatch( detailsError() );
	}

};