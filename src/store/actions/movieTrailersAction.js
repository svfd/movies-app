import types from '../types';

export const trailersRequested = () => {
	return {
		type: types.FETCH_TRAILERS_REQUEST
	};
};

export const trailersLoaded = (data) => {
	return {
		type: types.FETCH_TRAILERS_SUCCESS,
		payload: data
	};
};

export const trailersError = () => {
	return {
		type: types.FETCH_TRAILERS_FAILURE
	};
};

export const fetchMovieTrailers = ({ getMovieTrailers, transformMovieTrailers }) => (id) => async (dispatch) => {

	dispatch( trailersRequested() );

	try {
		const { results } = await getMovieTrailers(id);
		const transformedResponse = transformMovieTrailers(results);
		dispatch( trailersLoaded(transformedResponse) );
	} catch(err) {
		dispatch( trailersError() );
	}

};