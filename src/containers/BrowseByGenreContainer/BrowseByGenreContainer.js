import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fetchMoviesByGenre } from '@/store/actions';
import { routesMap, routeBuilder } from '@/routes';
import { withMovieDatabaseService, withData } from '@/Hoc';
import { WithMovieListAndPagination } from '@/Helpers';

const BrowseByGenreContainer = ({ movies, pages, params }) => {

	const [ filter, page ] = params;

	return (
		<WithMovieListAndPagination data={movies}
																pages={pages}
																currentPage={page}
																pathTo={routeBuilder(routesMap.browseByGenre, {filter}) + '/'}
		/>
	);
};

const paramsToUseEffect = () => {
	const { filter, page = 1 } = useParams();
	return [filter, page];
};

const mapStateToProps = ({ movies: { movies, pages, loading, error } }) => {
	return {movies, pages, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchMoviesByGenre(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(paramsToUseEffect)
							)(BrowseByGenreContainer);