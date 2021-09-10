import React from 'react';
import PropTypes from 'prop-types';

import './SectionTitle.less';

const SectionTitle = ({ title }) => {
	return (
		<h3 className="section-title">{title}</h3>
	);
};

SectionTitle.propTypes = {
	title: PropTypes.string.isRequired
};

export default SectionTitle;