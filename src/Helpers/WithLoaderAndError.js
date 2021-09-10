import React from 'react';

import ErrorIndicator from '../components/ErrorIndicator';
import Spinner from '../components/Spinner';

const WithLoadingAndError = ({ loading, error, children }) => {

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <ErrorIndicator />;
	}

	return children;
};

export default WithLoadingAndError;