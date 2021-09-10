import types from '../types';

const updateMovies = (state, action) => {

	if (state === undefined) {
		return {
			movies: [],
			pages: 0,
			loading: true,
			error: null
		}
	}

	switch(action.type) {
		case types.FETCH_MOVIES_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}
		case types.FETCH_MOVIES_SUCCESS:
			return {
				...state,
				movies: [...action.payload.results],
				pages: action.payload.pages,
				loading: false,
				error: false
			};
		case types.FETCH_MOVIES_FAILURE:
			return {
				...state,
				loading: false,
				error: true
			}
			default:
				return state;
	}
};

export default updateMovies;