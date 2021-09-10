import React from 'react';
import PropTypes from 'prop-types';

import './MoviesWrapper.less';

const MoviesWrapper = ({ children }) => {
	return (
		<div className="movie-list-wrapper">
			{children}
		</div>
	);
};

MoviesWrapper.propTypes = {
	children: PropTypes.node.isRequired
};

export default MoviesWrapper;