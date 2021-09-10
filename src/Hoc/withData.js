import React, { useEffect } from 'react';
import { WithLoaderAndError } from '../Helpers';

const withData = (paramsToUseEffect) => (View) => {
	return ({ fetchData, loading, error, ...props }) => {

		const params = paramsToUseEffect();

		useEffect(() => {
			fetchData(...params);
		}, params);

		return (
			<WithLoaderAndError loading={loading} error={error}>
				<View {...props} params={params} />
			</WithLoaderAndError>
		);
	}
};

export default withData;