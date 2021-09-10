import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from '@/Helpers';
import { routes, privateRoutes } from '@/routes';

import { Page404 } from '@/Pages';
import PageHeaderContainer from '@/containers/PageHeaderContainer';

import 'react-image-gallery/styles/css/image-gallery.css';
import 'normalize.css';
import '@/assets/less/main.less';
import './App.less';

const App = () => {

	const routesList = routes.map(({ path, component }) => {
		return (
			<Route key={path} path={path} component={component} exact />
		);
	});

	const privateRoutesList = privateRoutes.map(({ path, component }) => {
		return (
			<PrivateRoute key={path} path={path} component={component} exact />
		);
	});

	return (
		<Fragment>
			<PageHeaderContainer />
			<Switch>
				{routesList}
				{privateRoutesList}
				<Route path="" component={Page404} />
			</Switch>
		</Fragment>
	);
};

export default App;