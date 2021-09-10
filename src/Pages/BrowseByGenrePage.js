import React from 'react';
import FilterContainer from '../containers/FilterContainer';
import BrowseByGenreContainer from '../containers/BrowseByGenreContainer';

const BrowseByGenrePage = () => {
	return (
		<main>
			<FilterContainer />
			<BrowseByGenreContainer />
		</main>
	)
};

export default BrowseByGenrePage;