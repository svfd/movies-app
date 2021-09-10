import types from '../types';

export const personDetailsRequested = () => {
	return {
		type: types.FETCH_PERSON_DETAILS_REQUEST
	};
};

export const personDetailsLoaded = (data) => {
	return {
		type: types.FETCH_PERSON_DETAILS_SUCCESS,
		payload: data
	};
};

export const personDetailsError = () => {
	return {
		type: types.FETCH_PERSON_DETAILS_FAILURE
	};
};

export const fetchPersonDetails = ({ getPersonDetails, transformPersonDetails }) => (id) => async (dispatch) => {
	dispatch( personDetailsRequested() );

	try {
		const response = await getPersonDetails(id);
		const transformedResponse = transformPersonDetails(response);
		dispatch( personDetailsLoaded(transformedResponse) );
	} catch(err) {
		dispatch( personDetailsError() );
	}

};