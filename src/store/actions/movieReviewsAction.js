import types from '../types';

export const reviewsRequested = () => {
	return {
		type: types.FETCH_REVIEWS_REQUEST
	};
};

export const reviewsLoaded = (data) => {
	return {
		type: types.FETCH_REVIEWS_SUCCESS,
		payload: data
	};
};

export const reviewsError = () => {
	return {
		type: types.FETCH_REVIEWS_FAILURE
	};
};

export const fetchMovieReviews = ({ getMovieReviews, transformMovieReviews }) => (id) => async (dispatch) => {

	dispatch( reviewsRequested() );

	try {
		const response = await getMovieReviews(id);
		const transformedResponse = transformMovieReviews(response);
		dispatch( reviewsLoaded(transformedResponse) );
	} catch(err) {
		dispatch( reviewsError() );
	}

};