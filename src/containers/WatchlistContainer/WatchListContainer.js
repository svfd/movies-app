import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fetchWatchList, removeMovieFromWatchList, userRequestStatusReset } from '@/store/actions';
import { withMovieDatabaseService, withFirebaseService } from '@/Hoc';
import { WithLoaderAndError } from '@/Helpers';

import WatchList from '@/components/WatchList';
import Modal from '@/components/Modal';

class WatchListContainer extends Component {

	updateWatchlist = () => {
		const { idList } = this.props.watchList;

		idList.length > 0 && this.props.fetchWatchList(idList);
	};

	componentDidMount() {
		this.updateWatchlist();
	}

	componentDidUpdate(prevProps, prevState) {

		const { idList } = this.props.watchList;
		const { isAuth } = this.props.auth;

		if (idList.length !== prevProps.watchList.idList.length && isAuth !== false) {
			this.updateWatchlist();
		}

	}

	render() {

		const { localId, token } = this.props.auth;
		const { movies, loading, error, isUserRequestError } = this.props.watchList;
		const { onRemoveMovie, onResetUserRequestStatus } = this.props;

		const boundRemoveMovie = onRemoveMovie.bind(null, localId, token);

		const userRequestModalError = (
			<Modal title="Request error"
							message="Cannot remove movie. Please try again"
							onModalClose={onResetUserRequestStatus}
			/>
		);

		return (
			<WithLoaderAndError loading={loading} error={error}>
				{isUserRequestError && userRequestModalError}
				<WatchList watchlist={movies}
										onRemoveMovie={boundRemoveMovie}
										isFavorite
				/>
			</WithLoaderAndError>
		);
	}

};

const mapStateToProps = ({ auth, watchList }) => {
	return {auth, watchList};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService, FirebaseService }) => {
	return bindActionCreators({
		fetchWatchList: fetchWatchList(MovieDatabaseService),
		onRemoveMovie: removeMovieFromWatchList(FirebaseService),
		onResetUserRequestStatus: userRequestStatusReset
	}, dispatch);
};

export default compose(
								withFirebaseService,
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps)
							)(WatchListContainer);