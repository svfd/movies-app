import types from '../types';

const updateGallery = (state, action) => {

	if (state === undefined) {
		return {
			gallery: [],
			loading: true,
			error: false
		}
	}

	switch(action.type) {
		case types.FETCH_IMAGES_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_IMAGES_SUCCESS:
			return {
				gallery: action.payload,
				loading: false,
				error: false
			};
		case types.FETCH_IMAGES_FAILURE:
			return {
				...state,
				error: true,
				loading: false
			};
		default:
			return {
				...state
			};
	}

};

export default updateGallery;