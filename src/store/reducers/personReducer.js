import types from '../types';

const updatePerson = (state, action) => {
	if (state === undefined) {
		return {
			details: {},
			loading: true,
			error: false
		};
	}

	switch(action.type) {
		case types.FETCH_PERSON_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_PERSON_DETAILS_SUCCESS:
			return {
				...state,
				details: action.payload,
				loading: false,
				error: false
			}
		case types.FETCH_PERSON_DETAILS_FAILURE:
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
}

export default updatePerson;