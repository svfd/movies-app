import React, { useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { withFirebaseService } from '@/Hoc';
import { signOut, checkUserSession, fetchWatchListIds, watchListCleaned } from '@/store/actions';
import { userToken } from '@/utils';

import Button from '@/components/Auth/Button';

const AuthContainer = ({ checkUserSession, fetchWatchListIds, token, ...props }) => {

	let { tokenExpires, localId, onSignOut, onCleanWatchList, isAuth } = props;

	token = token || userToken.token;
	tokenExpires = tokenExpires || userToken.tokenExpires;

	useEffect(() => {

		let timeoutID = null;

		if (tokenExpires > 0) {
			timeoutID = setTimeout(() => {
				alert('Your token has been expired. Please login again');
				onSignOut();
				onCleanWatchList();
			}, tokenExpires - Date.now());
		}

		token && checkUserSession(token, tokenExpires);
		localId && fetchWatchListIds(localId, token);

		if (!token) {
			onSignOut();
			onCleanWatchList();
		}

		return () => clearTimeout(timeoutID);
	}, [token, localId]);

	return (
		<Button onSignOut={onSignOut}
						isAuth={isAuth}
		/>
	);
};

const mapStateToProps = ({ auth }) => {
	const { isAuth, token, tokenExpires, localId } = auth;
	return {isAuth, token, tokenExpires, localId};
};

const mapDispatchToProps = (dispatch, { FirebaseService }) => {
	return bindActionCreators({
		onSignOut: signOut,
		onCleanWatchList: watchListCleaned,
		checkUserSession: checkUserSession(FirebaseService),
		fetchWatchListIds: fetchWatchListIds(FirebaseService)
	}, dispatch);
};

export default compose(
								withFirebaseService,
								connect(mapStateToProps, mapDispatchToProps),
							)(AuthContainer);