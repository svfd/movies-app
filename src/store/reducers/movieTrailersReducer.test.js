import trailersReducer from './movieTrailersReducer.js';
import { trailersRequested, trailersLoaded, trailersError, fetchMovieTrailers } from '../actions/movieTrailersAction.js';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const results = [
	{
		id: 1,
		name: 'foo1',
		url: ''
	},
	{
		id: 2,
		name: 'foo2',
		url: ''
	}
];

beforeEach(() => {
	mockedDispatch.mockReset();

	state = {
		trailers: [],
		loading: true,
		error: false
	}
});

describe('movie trailers', () => {

	it('trailers added', () => {

		const newState = trailersReducer(state, trailersLoaded(results));

		expect(newState.trailers).toStrictEqual(results);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('trailers error', () => {

		const newState = trailersReducer(state, trailersError());

		expect(newState.trailers).toHaveLength(0);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeTruthy();
	});

	const movieId = 1;

	movieDatabaseService.transformMovieTrailers = jest.fn(() => results);

	it('fetch movie trailers success', async () => {

		movieDatabaseService.getMovieTrailers = jest.fn().mockResolvedValue(Promise.resolve(results));

		await fetchMovieTrailers(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, trailersRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, trailersLoaded(results));
	});

	it('fetch movies trailers failure', async () => {

		movieDatabaseService.getMovieTrailers = jest.fn().mockResolvedValue(Promise.reject());

		await fetchMovieTrailers(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, trailersRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, trailersError());
	});

});