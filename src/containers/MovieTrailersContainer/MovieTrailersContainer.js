import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fetchMovieTrailers } from '@/store/actions';
import { withMovieDatabaseService, withData } from '@/Hoc';

import MovieTrailers from '@/components/MovieDetails/Trailer';

const MovieTrailersContainer = ({ trailers }) => {
	return <MovieTrailers trailers={trailers} />
};

const paramsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ({ movieTrailers: { trailers, loading, error } }) => {
	return {trailers, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchMovieTrailers(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(paramsToUseEffect)
							)(MovieTrailersContainer);