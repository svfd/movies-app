import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { signUp, signIn } from '@/store/actions';
import { withFirebaseService } from '@/Hoc';

import { userToken } from '@/utils';

import Form from '@/components/Auth/Form';

const AuthFormContainer = ({ onSignIn, onSignUp, token, errorMessage }) => {

	token = token || userToken.token;

	if (token) {
		return <Redirect to="/" />;
	}

	const [ passwordMessage, setPasswordMessage ] = useState('');
	const [ currentType, setType ] = useState('sign in');

	const formTypes = {
		'sign in': {
			text: 'Do not have an account yet?',
			newType: 'sign up'
		},
		'sign up': {
			text: 'Already have an account?',
			newType: 'sign in'
		}
	};

	const onSubmitForm = (email, firstPassword, secondPassword) => {

		setPasswordMessage('');

		if (currentType === 'sign in') {
			onSignIn(email, firstPassword);
		}
		
		if (currentType === 'sign up') {

			const arePasswordsSame = firstPassword === secondPassword;

			arePasswordsSame ? onSignUp(email, firstPassword) : setPasswordMessage('Passwords are not identical');
		}

	};

	let formMessage = '';

	if (errorMessage || passwordMessage) {
		formMessage = passwordMessage || errorMessage;
	}

	return (
		<Form onSubmitForm={onSubmitForm}
					currentType={currentType}
					currentText={formTypes[currentType].text}
					newType={formTypes[currentType].newType}
					setType={setType}
					isShowSecondPassword={currentType === 'sign up'}
					errorMessage={formMessage}
		/>
	);
};

const mapStateToProps = ({ auth: { token, errorMessage } }) => {
	return {token, errorMessage};
};

const mapDispatchToProps = (dispatch, { FirebaseService }) => {
	return bindActionCreators({
		onSignUp: signUp(FirebaseService),
		onSignIn: signIn(FirebaseService)
	}, dispatch);
};

export default compose(
								withFirebaseService,
								connect(mapStateToProps, mapDispatchToProps)
							)(AuthFormContainer);