import types from '../types';

export const imagesRequested = () => {
	return {
		type: types.FETCH_IMAGES_REQUEST
	};
};

export const imagesLoaded = (data) => {
	return {
		type: types.FETCH_IMAGES_SUCCESS,
		payload: data
	};
};

export const imagesError = () => {
	return {
		type: types.FETCH_IMAGES_FAILURE
	};
};

export const fetchMovieImages = ({ getMovieImages, transformMovieImages }) => (id) => async (dispatch) => {

	dispatch( imagesRequested() );

	try {
		const response = await getMovieImages(id);
		const transformedResponse = transformMovieImages(response);
		dispatch( imagesLoaded(transformedResponse) );
	} catch(err) {
		dispatch( imagesError() );
	}

};