import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { withMovieDatabaseService, withData } from '@/Hoc';
import { fetchMovieImages } from '@/store/actions';

import MovieGallery from '@/components/MovieDetails/Gallery';

const MovieGalleryContainer = ({ gallery }) => {
	
	if (gallery.length === 0) {
		return null;
	}

	return (
		<MovieGallery gallery={gallery} />
	);
};

const paramsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ({movieImages: { gallery, loading, error } }) => {
	return {gallery, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchMovieImages(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(paramsToUseEffect)
							)(MovieGalleryContainer);