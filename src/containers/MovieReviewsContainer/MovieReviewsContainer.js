import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { withMovieDatabaseService, withData } from '@/Hoc';
import { fetchMovieReviews } from '@/store/actions';

import MovieReviews from '@/components/MovieDetails/Reviews';

const MovieReviewsContainer = ({ reviews }) => {

	if (reviews.length === 0) {
		return null;
	}

	return (
		<MovieReviews reviews={reviews} />
	);
};

const paramsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ( {movieReviews:  { reviews, loading, error }}) => {
	return {reviews, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchMovieReviews(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(paramsToUseEffect)
							)(MovieReviewsContainer);