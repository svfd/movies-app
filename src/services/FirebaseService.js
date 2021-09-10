class FirebaseService {

	_apiKey = '';
	_authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
	_databaseUrl = 'https://movies-app-40b14-default-rtdb.firebaseio.com/watchlist/';

	_makeRequest = async (url, data) => {

		const response = await fetch(url, data);

		if (!response.ok) {
			throw new Error('Request error');
		}

		return await response.json();
	};

	_authRequest = (type, data) => {

		const requestData = {
			headers: {'Content-Type': 'application/json'},
			method: 'POST'
		};

		data.returnSecureToken = true;
		requestData.body = JSON.stringify(data);

		return this._makeRequest(`${this._authUrl}${type}?key=${this._apiKey}`, requestData);
	};

	_databaseRequest = (url, method, data) => {

		const requestData = {
			headers: {'Content-Type': 'application/json'},
			method
		};

		if (data) {
			requestData.body = JSON.stringify(data);
		}

		return this._makeRequest(`${this._databaseUrl}${url}&key=${this._apiKey}`, requestData);
	};

	signUp = (data) => {
		return this._authRequest('signUp', data);
	};

	signIn = (data) => {
		return this._authRequest('signInWithPassword', data);
	};

	getUserData = (token) => {
		return this._authRequest('lookup', {idToken: token});
	};

	addMovieToWatchList = (userId, movieId, token) => {
		return this._databaseRequest(`${userId}/${movieId}.json?auth=${token}`, 'PUT', movieId);
	};

	removeMovieFromWatchList = (userId, movieId, token) => {
		return this._databaseRequest(`${userId}/${movieId}.json?auth=${token}`, 'DELETE', movieId);
	};

	getWatchListIds = (userId, token) => {
		return this._databaseRequest(`${userId}.json?auth=${token}`, 'GET');
	};

};

export default FirebaseService;