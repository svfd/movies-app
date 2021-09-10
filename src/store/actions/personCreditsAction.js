import types from '../types';

export const personCreditsRequested = () => {
	return {
		type: types.FETCH_PERSON_CREDITS_REQUEST
	};
};

export const personCreditsLoaded = (data) => {
	return {
		type: types.FETCH_PERSON_CREDITS_SUCCESS,
		payload: data.results
	};
};

export const personCreditsError = () => {
	return {
		type: types.FETCH_PERSON_CREDITS_FAILURE
	};
};

export const fetchPersonCredits = ({ getPersonCredits, transformMovies }) => (id) => async (dispatch) => {

	dispatch( personCreditsRequested() );
	
	try {
		const { cast } = await getPersonCredits(id);
		const transformedResponse = transformMovies(cast);
		dispatch( personCreditsLoaded(transformedResponse) );
	} catch {
		dispatch( personCreditsError() );
	}
	
};