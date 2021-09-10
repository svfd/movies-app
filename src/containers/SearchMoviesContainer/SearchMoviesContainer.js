import React, { Fragment } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { routesMap, routeBuilder } from '@/routes';
import { withMovieDatabaseService, withFirebaseService, withData } from '@/Hoc';
import { searchMovies } from '@/store/actions';
import { exactQueryFromLocation, exactPageFromLocation } from '@/utils';

import MovieList from '@/components/MovieList';
import Pagination from '@/components/Pagination';

const SearchMoviesContainer = ({ movies, pages, params }) => {

	let [ query, page ] = params;

	if (!query) {
		return <Redirect to={routeBuilder(routesMap.browseByType, {filter: 'upcoming'})} />
	}

	return (
		<Fragment>
			<MovieList data={movies} />
			<Pagination pages={pages}
									currentPage={page}
									pathTo={`${routesMap.search}?query=${query}&page=`}
			/>
		</Fragment>
	);
};

const paramsToUseEffect = () => {
	const location = useLocation();

	let query = exactQueryFromLocation(location);
	let page = exactPageFromLocation(location) || 1;

	return [query, page];
};

const mapStateToProps = ({ movies: { movies, pages, loading, error } }) => {
	return {movies, pages, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: searchMovies(MovieDatabaseService)
	}, dispatch)
};

export default compose(
									withMovieDatabaseService,
									withFirebaseService,
									connect(mapStateToProps, mapDispatchToProps),
									withData(paramsToUseEffect)
								)(SearchMoviesContainer);