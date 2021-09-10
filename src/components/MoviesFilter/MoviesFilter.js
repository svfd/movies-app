import React from 'react';
import PropTypes from 'prop-types';

import './MoviesFilter.less';

const MoviesFilter = ({ children }) => {
	return (
		<section className="filter">
			<div className="container">
				<div className="filter-wrapper">
					{children}
				</div>
			</div>
		</section>
	);
};

MoviesFilter.propTypes = {
	children: PropTypes.node.isRequired
};

export default MoviesFilter;