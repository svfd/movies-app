import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fetchPersonCredits } from '@/store/actions';
import { withMovieDatabaseService, withData } from '@/Hoc';

import MovieList from '@/components/MovieList';

const PersonCreditsContainer = ({ movies }) => {
	return (
		<MovieList data={movies}
								title="Movies"
		/>
	);
};

const mapParamsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ({ personCredits: { movies, loading, error } }) => {
	return {movies, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchPersonCredits(MovieDatabaseService)
	}, dispatch)
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(mapParamsToUseEffect)
							)(PersonCreditsContainer);