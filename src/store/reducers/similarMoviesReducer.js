import types from '../types';

const updateSimilarMovies = (state, action) => {

	if (state === undefined) {
		return {
			similarMovies: [],
			loading: true,
			error: false
		}
	}

	switch(action.type) {
		case types.FETCH_SIMILAR_MOVIES_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_SIMILAR_MOVIES_SUCCESS:
			return {
				similarMovies: action.payload.results,
				loading: false,
				error: false
			};
		case types.FETCH_SIMILAR_MOVIES_FAILURE:
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

export default updateSimilarMovies;