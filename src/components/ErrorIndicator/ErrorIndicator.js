import React from 'react';

import errorIcon from './errorIndicator.svg';
import './ErrorIndicator.less';

const ErrorIndicator = () => {
	return (
		<div className="error-indicator" aria-label="loading data error">
			<img src={errorIcon} alt="error icon" />
		</div>
	);
};

export default ErrorIndicator;