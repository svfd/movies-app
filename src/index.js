import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import { MovieDatabaseProvider, FirebaseServiceProvider } from './Context';
import { MovieDatabaseService, FirebaseService } from './services';

import ErrorBoundry from './components/ErrorBoundry';
import App from './components/App';

const movieDatabaseService = new MovieDatabaseService();
const firebaseService = new FirebaseService();

ReactDOM.render(
	<ErrorBoundry>
		<Provider store={store}>
			<MovieDatabaseProvider value={movieDatabaseService}>
				<FirebaseServiceProvider value={firebaseService}>
					<Router>
						<App />
					</Router>
				</FirebaseServiceProvider>
			</MovieDatabaseProvider>
		</Provider>
	</ErrorBoundry>,
	document.getElementById('root')
);