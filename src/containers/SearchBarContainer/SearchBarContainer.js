import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { routesMap } from '@/routes';

import SearchBar from '@/components/SearchBar';

const SearchBarContainer = () => {

	const [ value, setValue ] = useState('');
	const [ isValid, setValid ] = useState(null);

	const history = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		
		if (pathname.indexOf(routesMap.search) === -1) {
			setValue('');
		}

	}, [pathname]);

	const onFormValidate = (newValue) => {
		newValue = newValue.trim();
		return newValue.length === 0 ? null : /^[a-z0-9\s]+$/gi.test(newValue);
	};

	const onInputChange = (newValue) => {
		setValue(newValue);
		const isValidValue = onFormValidate(newValue);
		setValid(isValidValue);
	};

	const onFormSubmit = (evt) => {
		evt.preventDefault();

		const isValidValue = onFormValidate(value);

		if (isValidValue) {
			history.push(`${routesMap.search}/?query=${value}`);
		}
	}

	return (
		<SearchBar onInputChange={onInputChange}
								onFormSubmit={onFormSubmit}
								value={value}
								isValid={isValid}
		/>
	);
};

export default SearchBarContainer;