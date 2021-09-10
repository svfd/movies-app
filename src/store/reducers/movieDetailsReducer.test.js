import movieDetailsReducer from './movieDetailsReducer.js';
import { detailsRequested, detailsLoaded, detailsError, fetchSingleMovie } from '../actions';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const details = {
	id: 1,
	title: 'foo',
	budget: Infinity,
	description: 'foobar',
	releaseDate: new Date(),
	duration: Infinity,
	genres: '10',
	countries: ['Country'],
	tagline: 'bar',
	status: 'Released',
	rating: 2,
};

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		info: {},
		loading: true,
		error: false
	};

});

describe('movie details', () => {

	const movieId = 1;

	it('added details', () => {

		const newState = movieDetailsReducer(state, detailsLoaded(details));

		expect(newState.info).toStrictEqual(details);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it ('added an empty object', () => {

		const newState = movieDetailsReducer(state, detailsLoaded({}));

		expect(newState.info).toStrictEqual({});
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('fetch success', async () => {

		movieDatabaseService.getMovieById = jest.fn().mockResolvedValue(Promise.resolve(details));
		movieDatabaseService.transformMovie = jest.fn(() => details);

		await fetchSingleMovie(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, detailsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, detailsLoaded(details));
	});

	it('fetch failure', async () => {

		movieDatabaseService.getMovieById = jest.fn().mockResolvedValue(Promise.reject());

		await fetchSingleMovie(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, detailsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, detailsError());
	});

});