import React, { Fragment } from 'react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const WithMovieListAndPagination = (props) => {
	return (
		<Fragment>
			<MovieList {...props} />
			<Pagination {...props} />
		</Fragment>
	);
};

export default WithMovieListAndPagination;