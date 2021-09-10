import types from '../types';

const updateGenres = (state, action) => {

	if (state === undefined) {
		return {
			genres: [],
			loading: true,
			error: false
		};
	}

	switch(action.type) {
		case types.FETCH_GENRES_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_GENRES_SUCCESS:
			return {
				genres: action.payload.genres,
				loading: false,
				error: false
			};
		case types.FETCH_GENRES_FAILURE:
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

export default updateGenres;