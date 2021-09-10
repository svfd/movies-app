const exactPageFromLocation = ({ search }) => {

	const hasPage = /(?:page=)(?:[0-9])+/g.test(search);

	if (!hasPage) {
		return null;
	}

	return search.match(/(?:page=)(?:[0-9])/g).join('=').split('=')[1];
}

export default exactPageFromLocation;