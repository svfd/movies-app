import React from 'react';
import PropTypes from 'prop-types';

import './CrossButton.less';

const CrossButton = ({ cb, defaultProps = {}, ...props }) => {

	const { className = '' } = props;

	let classes = `close-button ${className}`;

	return (
		<button aria-label="close"
						{...props}
						className={classes}
						onClick={cb}
		>
		</button>
	);
};

CrossButton.propTypes = {
	cb: PropTypes.func.isRequired
}

export default CrossButton;