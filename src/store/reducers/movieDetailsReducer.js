import types from '../types';

const updateMovieDetails = (state, action) => {

	if (state === undefined) {
		return {
			info: {},
			loading: true,
			error: null
		}
	}

	switch(action.type) {
		case types.FETCH_SINGLE_MOVIE_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_SINGLE_MOVIE_SUCCESS:
			return {
				info: action.payload,
				loading: false,
				error: false
			};
		case types.FETCH_SINGLE_MOVIE_FAILURE:
			return {
				...state,
				loading: false,
				error: true
			};
		default:
			return state;
	}
};

export default updateMovieDetails;