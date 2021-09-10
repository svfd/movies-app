import watchListReducer from './watchListReducer.js';
import {
	watchListRequested,
	watchListLoaded,
	idListLoaded,
	movieAddedToWatchList,
	movieRemovedFromWatchList,
	watchListCleaned,
	watchListError,
	fetchWatchList,
	addMovieToWatchList,
	fetchWatchListIds,
	removeMovieFromWatchList,
	fetchUserRequestError
} from '../actions';

import { MovieDatabaseService, FirebaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');
jest.mock('@/services/FirebaseService.js');

const movieDatabaseService = new MovieDatabaseService();
const firebaseService = new FirebaseService();

const mockedDispatch = jest.fn();

let state = {};

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		movies: [],
		idList: [1, 2],
		loading: true,
		error: false
	};
});

describe('watchList', () => {

	const movies = [
		{
			id: 3,
			image: 'path-to-image',
			title: 'image3'
		},
		{
			id: 4,
			image: 'path-to-image',
			title: 'image4'
		},
	];

	const idList = [3, 4];

	const idNumber = {
		newId: 4,
		removedId: 2,
		nonExistent: 5,
	};

	const user = {
		id: 1,
		token: 'some user token'
	};

	it('movies added', () => {
		const newState = watchListReducer(state, watchListLoaded(movies));
		expect(newState.movies).toStrictEqual(movies);
	});

	it('watchlist error', () => {

		const newState = watchListReducer(state, watchListError());

		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeTruthy();
	});

	it('pass an empty array to reducer', () => {
		const newState = watchListReducer(state, watchListLoaded([]));
		expect(newState.movies).toHaveLength(0);
	});

	it('new id added to idlist', () => {
		const newState = watchListReducer(state, movieAddedToWatchList(idNumber.newId));
		expect(newState.idList).toHaveLength(3);
	});

	it('removed existent id from idlist', () => {
		const newState = watchListReducer(state, movieRemovedFromWatchList(idNumber.removedId));
		expect(newState.idList).toHaveLength(1);
	});

	it('removed non-existent id from idlist', () => {
		const newState = watchListReducer(state, movieRemovedFromWatchList(idNumber.nonExistent));
		expect(newState.idList).toHaveLength(state.idList.length);
	});

	it('cleaned watchlist', () => {
		const newState = watchListReducer(state, watchListCleaned());

		expect(newState).toStrictEqual({
			movies: [],
			idList: [],
			loading: true,
			error: false
		});

	});

	it('fetch watchlist success', async () => {

		movieDatabaseService.getMovieById = jest.fn().mockResolvedValue(Promise.resolve(movies));
		movieDatabaseService.transformMovies = jest.fn(() => ({results: movies}));
		
		await fetchWatchList(movieDatabaseService)(idList)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, watchListRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, watchListLoaded(movies));
	});

	it('fetch watchlist failure', async () => {

		movieDatabaseService.getMovieById = jest.fn().mockResolvedValue(Promise.reject());

		await fetchWatchList(movieDatabaseService)(idList)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, watchListRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, watchListError());
	});

	it('get watchlist ids success', async () => {

		firebaseService.getWatchListIds = jest.fn().mockResolvedValue(Promise.resolve(idList));

		await fetchWatchListIds(firebaseService)(user.id, user.token)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(idListLoaded(idList));
	});

	it('get watchlist ids failure', async () => {

		firebaseService.getWatchListIds = jest.fn().mockResolvedValue(Promise.reject());

		await fetchWatchListIds(firebaseService)(user.id, user.token)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(watchListError());
	});

	it('add movie to watchlist success', async () => {

		firebaseService.addMovieToWatchList = jest.fn().mockResolvedValue(Promise.resolve());

		await addMovieToWatchList(firebaseService)(user.id, user.token, idNumber.newId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(movieAddedToWatchList(idNumber.newId));
	});

	it('add movie to watchlist failure', async () => {

		firebaseService.addMovieToWatchList = jest.fn().mockResolvedValue(Promise.reject());

		await addMovieToWatchList(firebaseService)(user.id, user.token, idNumber.newId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(fetchUserRequestError());
	});

	it('remove movie from watchlist success', async () => {

		firebaseService.removeMovieFromWatchList = jest.fn().mockResolvedValue(Promise.resolve());

		await removeMovieFromWatchList(firebaseService)(user.id, user.token, idNumber.newId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(movieRemovedFromWatchList(idNumber.newId));
	});

	it('remove movie from watchlist failure', async () => {

		firebaseService.removeMovieFromWatchList = jest.fn().mockResolvedValue(Promise.reject());

		await removeMovieFromWatchList(firebaseService)(user.id, user.token, idNumber.newId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(fetchUserRequestError());
	});

});