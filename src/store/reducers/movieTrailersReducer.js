import types from '../types';

const updateTrailers = (state, action) => {

	if (state === undefined) {
		return {
			trailers: [],
			loading: true,
			error: false
		};
	}

	switch(action.type) {
		case types.FETCH_TRAILERS_REQUEST:
			return {
				...state.movieTrailers,
				loading: true,
				error: false
			};
		case types.FETCH_TRAILERS_SUCCESS:
			return {
				trailers: action.payload,
				loading: false,
				error: false
			};
			case types.FETCH_TRAILERS_FAILURE:
				return {
					...state,
					loading: false,
					error: true
				};
		default:
			return {
				...state
			}
	}

};

export default updateTrailers;