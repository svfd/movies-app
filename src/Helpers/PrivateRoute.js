import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { routesMap } from '../routes';

const PrivateRoute = ({ component: Component, isAuth, ...props }) => {

	if (isAuth === null) {
		return null;
	}

	return (
		<Route render={() => {
			return isAuth ?
				<Component {...props} />
				:
				<Redirect to={routesMap.auth} />
			}}
		/>
	);
};

const mapStateToProps = ({ auth: { isAuth } }) => {
	return {isAuth};
};

export default connect(mapStateToProps, null)(PrivateRoute);