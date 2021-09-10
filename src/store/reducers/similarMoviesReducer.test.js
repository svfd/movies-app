import similarMoviesReducer from './similarMoviesReducer.js';
import { similarMoviesRequested, similarMoviesLoaded, similarMoviesError, fetchSimilarMovies } from '../actions/similarMoviesAction.js';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const results = {
	results: [
		{
			id: 1,
			image: '',
			title: 'foo1'
		},
		{
			id: 2,
			image: '',
			title: 'foo2'
		}
	],
	pages: 10
};

beforeEach(() => {

	state = {
		similarMovies: [],
		loading: true,
		error: false
	};

	mockedDispatch.mockReset();

});

describe('similar movies', () => {

	const movieId = 1;
	movieDatabaseService.transformMovies = jest.fn(() => results);

	it('similar movies added', () => {

		const newState = similarMoviesReducer(state, similarMoviesLoaded(results));

		expect(newState.similarMovies).toStrictEqual(results.results);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('similar movies error', () => {

		const newState = similarMoviesReducer(state, similarMoviesError());

		expect(newState.similarMovies).toHaveLength(0);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeTruthy();
	});

	it('fetch similar movies succes', async () => {

		movieDatabaseService.getSimilarMovies = jest.fn().mockResolvedValue(Promise.resolve(results));

		await fetchSimilarMovies(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, similarMoviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, similarMoviesLoaded(results));
	});

	it('fetch similar movies failure', async () => {

		movieDatabaseService.getSimilarMovies = jest.fn().mockResolvedValue(Promise.reject());

		await fetchSimilarMovies(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, similarMoviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, similarMoviesError());
	});

});