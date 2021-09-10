import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { withMovieDatabaseService, withFirebaseService, withData } from '@/Hoc';
import { fetchSingleMovie, addMovieToWatchList, removeMovieFromWatchList, userRequestStatusReset } from '@/store/actions';
import { useTitle } from '@/utils';

import MovieInfo from '@/components/MovieDetails/Info';
import MovieImagesContainer from '../MovieImagesContainer';
import MovieCastContainer from '../MovieCastContainer';
import MovieReviewsContainer from '../MovieReviewsContainer';
import SimilarMoviesContainer from '../SimilarMoviesContainer';
import Modal from '@/components/Modal';
import TrailerWrapper from '@/components/MovieDetails/Trailer/Wrapper';

const MovieDetailsContainer = ({ onAddMovie, onRemoveMovie, onResetUserRequestStatus, ...props }) => {

	const [ isErrorAuthModal, setErrorAuthModal ] = useState(false);
	const [ isTrailerVisible, setTrailerState ] = useState(false);

	const {
		movieDetails: { info },
		auth: { isAuth, localId, token },
		watchList: { idList, isUserRequestError }
	} = props;

	useTitle(info.title);

	const isFavorite = idList.includes(info.id);

	const onChangeWatchList = () => {

		const fn = isFavorite ? onRemoveMovie : onAddMovie;

		isAuth ? fn(localId, token, info.id) : setErrorAuthModal(true);
	};

	const onShowTrailer = () => {
		setTrailerState(true);
	};

	const onCloseTrailer = () => {
		setTrailerState(false);
	};

	const authErrorModal = (
		<Modal title="Auth error"
						message="Please log in to add movie to the watchlist"
						onModalClose={() => setErrorAuthModal(false)}
		/>
	);

	const userRequestErrorModal = (
		<Modal title="Request error"
						message="Couldn't send request. Please try again"
						onModalClose={onResetUserRequestStatus}
		/>
	);

	return (
		<Fragment>
			{isErrorAuthModal && authErrorModal}
			{isUserRequestError && userRequestErrorModal}
			{isTrailerVisible &&
				<TrailerWrapper onCloseTrailer={onCloseTrailer} />
			}
			<MovieInfo info={info}
									isAuth={isAuth}
									isFavorite={isFavorite}
									onShowTrailer={onShowTrailer}
									onChangeWatchList={onChangeWatchList}
			/>
			<MovieImagesContainer />
			<MovieCastContainer />
			<MovieReviewsContainer />
			<SimilarMoviesContainer />
		</Fragment>
	);
};

const paramsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ({ movieDetails, auth, watchList }) => {
	const { loading, error } = movieDetails;
	return {movieDetails, auth, watchList, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService, FirebaseService }) => {
	return bindActionCreators({
		fetchData: fetchSingleMovie(MovieDatabaseService),
		onAddMovie: addMovieToWatchList(FirebaseService),
		onRemoveMovie: removeMovieFromWatchList(FirebaseService),
		onResetUserRequestStatus: userRequestStatusReset
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								withFirebaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(paramsToUseEffect)
							)(MovieDetailsContainer);