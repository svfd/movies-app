import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { withMovieDatabaseService, withData } from '@/Hoc';
import { fetchSimilarMovies } from '@/store/actions';

import MovieList from '@/components/MovieList';

const SimilarMoviesContainer = ({ similarMovies }) => {

	if (similarMovies.length === 0) {
		return null;
	}

	return (
			<MovieList data={similarMovies}
									title="Similar movies"
			/>
	);
};

const paramsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ({ similarMovies: { similarMovies, loading, error } }) => {
	return {similarMovies, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchSimilarMovies(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(paramsToUseEffect)
							)(SimilarMoviesContainer);