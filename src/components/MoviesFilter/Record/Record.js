import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Record.less';

const Record = ({ pathTo, label }) => {
	return (
		<Link className="filter-item" to={pathTo}>{label}</Link>
	);
};

Record.propTypes = {
	pathTo: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
};

export default Record;