const exactQueryFromLocation = ({ search }) => {

	const decodedUri = decodeURI(search);

	const hasKeyword = /(?:query=)(?:[a-z]|[а-яё])+/gi.test(decodedUri);

	if (!hasKeyword) {
		return null;
	};

	const query = decodedUri.match(/(query=)([a-z\s]+)/gi).join('=').split('=')[1];

	const encodedUri = encodeURI(query);

	return encodedUri;
};

export default exactQueryFromLocation;