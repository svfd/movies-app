import React from 'react';
import FilterContainer from '../containers/FilterContainer';
import BrowseByTypeContainer from '../containers/BrowseByTypeContainer';

const BrowseByTypePage = () => {
	return (
		<main>
			<FilterContainer />
			<BrowseByTypeContainer />
		</main>
	)
};

export default BrowseByTypePage;