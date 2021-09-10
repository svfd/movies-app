import types from '../types';

const updateMovieCast = (state, action) => {

	if (state === undefined) {
		return {
			cast: [],
			loading: true,
			error: false
		}
	}

	switch(action.type) {
		case types.FETCH_CAST_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_CAST_SUCCESS:
			return {
				cast: action.payload,
				loading: false,
				error: false
			};
		case types.FETCH_CAST_FAILURE:
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

export default updateMovieCast;