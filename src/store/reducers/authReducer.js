import types from '../types';

const updateAuth = (state, action) => {

	if (state === undefined) {
		return {
			isAuth: null,
			email: '',
			token: '',
			tokenExpires: 0,
			localId: '',
			errorMessage: ''
		};
	};
	
	switch(action.type) {
		case types.USER_SESSION_STARTED:
			return {
				isAuth: true,
				email: action.payload.email,
				token: action.payload.idToken,
				tokenExpires: action.payload.expiresIn,
				localId: action.payload.localId,
				errorMessage: ''
			};
		case types.USER_SESSION_REMOVED:
			return {
				isAuth: false,
				email: '',
				token: '',
				tokenExpires: 0,
				localId: '',
				errorMessage: ''
			};
		case types.USER_AUTH_ERROR_RESET:
			return {
				...state,
				errorMessage: ''
			};
		case types.USER_AUTH_ERROR:
			return {
				...state,
				errorMessage: action.payload
			};
		default:
			return state
	}
};

export default updateAuth;