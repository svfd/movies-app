import types from '../types';

export const castRequested = () => {
	return {
		type: types.FETCH_CAST_REQUEST
	};
};

export const castLoaded = (data) => {
	return {
		type: types.FETCH_CAST_SUCCESS,
		payload: data
	};
};

export const castError = () => {
	return {
		type: types.FETCH_CAST_FAILURE
	};
};

export const fetchMovieCast = ({ getMovieCredits, transformMovieCredits }) => (id) => async (dispatch) => {
	dispatch( castRequested() );

	try {
		const { cast } = await getMovieCredits(id);
		const transformedResponse = transformMovieCredits(cast);
		dispatch( castLoaded(transformedResponse) );
	} catch(err) {
		dispatch( castError() );
	}
	
};