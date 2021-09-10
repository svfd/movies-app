import types from '../types';

const updateMovieReviews = (state, action) => {

	if (state === undefined) {
		return {
			reviews: [],
			loading: true,
			error: false
		};
	}

	switch(action.type) {
		case types.FETCH_REVIEWS_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_REVIEWS_SUCCESS:
			return {
				reviews: action.payload,
				loading: false,
				error: false
			};
		case types.FETCH_REVIEWS_FAILURE:
			return {
				...state,
				loading: false,
				error: true
			};
		default:
			return {
				...state
			};
	}

};

export default updateMovieReviews;