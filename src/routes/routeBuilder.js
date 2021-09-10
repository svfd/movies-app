const routeBuilder = (name, param) => {

	for (let key in param) {
		return name.replace(/:[a-z\d\\?]+/i, param[key]).replace('/:page?', '');
	}

};

export default routeBuilder;