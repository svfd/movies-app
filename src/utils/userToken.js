const userToken = {
	write: ({ idToken, expiresIn }) => {
		localStorage.setItem('idToken', idToken);
		localStorage.setItem('tokenExpires', Date.now() + expiresIn * 1000);
	},
	get: () => {
		const token = localStorage.getItem('idToken');
		const tokenExpires = localStorage.getItem('tokenExpires');
	
		return {token, tokenExpires};
	},
	clear: () => {
		localStorage.clear();
	},
	get token() {
		return localStorage.getItem('idToken');
	},
	get tokenExpires() {
		return localStorage.getItem('tokenExpires');
	}
};

export default userToken;