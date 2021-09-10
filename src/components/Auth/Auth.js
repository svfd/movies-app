import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import './Auth.less';

const Auth = ({ onSignOut, isAuth }) => {
	return (
		<Button onSignOut={onSignOut}
						isAuth={isAuth}
		/>
	);
};

Auth.propTypes = {
	onSignOut: PropTypes.func.isRequired,
	isAuth: PropTypes.bool.isRequired
};

export default Auth;