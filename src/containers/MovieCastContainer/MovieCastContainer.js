import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { withMovieDatabaseService, withData } from '@/Hoc';
import { fetchMovieCast } from '@/store/actions';

import MovieCast from '@/components/MovieDetails/Cast';

const MovieCastContainer = ({ cast }) => {

	if (cast.length === 0) {
		return null;
	}

	return (
		<MovieCast cast={cast} />
	);
};

const paramsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ({ movieCast: { cast, loading, error } }) => {
	return {cast, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchMovieCast(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(paramsToUseEffect)
							)(MovieCastContainer);