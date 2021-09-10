import types from '../types';
import { userToken } from '@/utils';

export const setUserSession = (user) => {
	return {
		type: types.USER_SESSION_STARTED,
		payload: user
	};
};

export const resetAuthErrorMessage = () => {
	return {
		type: types.USER_AUTH_ERROR_RESET
	};
};

export const signOut = () => {
	userToken.clear();
	return {
		type: types.USER_SESSION_REMOVED
	}
}

export const authError = (data) => {
	return {
		type: types.USER_AUTH_ERROR,
		payload: data
	};
};

export const signUp = ({ signUp }) => (email, password) => async (dispatch) => {
	dispatch( resetAuthErrorMessage() );
	try {
		const response = await signUp({ email, password });
		dispatch( setUserSession({...response, expiresIn: Date.now() + response.expiresIn * 1000}) );
		userToken.write(response);
	} catch({ message }) {
		dispatch( authError(message) );
	}
};

export const signIn = ({ signIn }) => (email, password) => async (dispatch) => {
	dispatch( resetAuthErrorMessage() );
	try {
		const response = await signIn({email, password});
		dispatch( setUserSession({...response, expiresIn: Date.now() + response.expiresIn * 1000}) );
		userToken.write(response);
	} catch({ message }) {
		dispatch( authError(message) );
	}
};

export const checkUserSession = ({ getUserData }) => (token, tokenExpires) => async (dispatch) => {
	try {
		const { users } = await getUserData(token);
		const user = users[0];
		dispatch( setUserSession({...user, idToken: token, expiresIn: tokenExpires}) );
	} catch(err) {
		dispatch( signOut() );
	}
};