import types from '../types';

const updatePersonCredits = (state, action) => {

	if (state === undefined) {
		return {
			movies: [],
			loading: true,
			error: false
		};
	}

	switch(action.type) {
		case types.FETCH_PERSON_CREDITS_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_PERSON_CREDITS_SUCCESS:
			return {
				movies: action.payload,
				loading: false,
				error: false
			};
		case types.FETCH_PERSON_CREDITS_FAILURE:
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

export default updatePersonCredits;