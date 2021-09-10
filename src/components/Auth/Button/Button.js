import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routesMap } from '@/routes';

import './Button.less';

const Button = ({ isAuth, onSignOut }) => {

	let authBlock;

	if (!isAuth) {
		authBlock = (
			<Link className="auth-button auth-button-login"
							to={routesMap.auth}
			>
				Sign In
			</Link>
		);
	} else {
		authBlock = (
			<button className="auth-button auth-button-logout"
							onClick={onSignOut}
			>
				Sign Out
			</button>
		);
	}

	return (
		<div className="auth-button-wrapper">
			{authBlock}
		</div>
	);
};

Button.propTypes = {
	isAuth: PropTypes.oneOf([true, false, null]),
	onSignOut: PropTypes.func.isRequired
};

export default Button;