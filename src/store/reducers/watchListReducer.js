import types from '../types';

const removeMovie = (state, movieId) => {

	const { idList } = state;

	return idList.filter((id) => id !== movieId);
};

const updateWatchList = (state, action) => {

	if (state === undefined) {
		return {
			movies: [],
			idList: [],
			loading: true,
			error: false,
			isUserRequestError: false
		};
	}

	switch(action.type) {
		case types.FETCH_WATCHLIST_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			};
		case types.FETCH_IDLIST_SUCCESS:
			return {
				...state,
				idList: [...state.idList, ...action.payload],
				loading: false,
				error: false
			}
		case types.FETCH_WATCHLIST_SUCCESS:
			return {
				...state,
				movies: action.payload,
				loading: false,
				error: false
			}
		case types.MOVIE_ADDED_TO_WATCHLIST:
			return {
				...state,
				idList: [...state.idList, action.payload]
			};
		case types.MOVIE_REMOVED_FROM_WATCHLIST:
			return {
				...state,
				idList: [...removeMovie(state, action.payload)]
			};
		case types.WATCHLIST_CLEANED:
			return {
				...state,
				movies: [],
				idList: []
			};
		case types.FETCH_USER_REQUEST_STARTED:
			return {
				...state,
				isUserRequestError: false
			};
		case types.USER_REQUEST_STATUS_RESET:
			return {
				...state,
				isUserRequestError: false
			};
		case types.FETCH_USER_REQUEST_FAILURE:
			return {
				...state,
				isUserRequestError: true
			};
		case types.FETCH_WATCHLIST_FAILURE:
			return {
				...state,
				loading: false,
				error: true
			};
		default:
			return state;
	}
}

export default updateWatchList;