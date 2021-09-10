import movieCastReducer from './movieCastReducer.js';
import { castRequested, castLoaded, castError, fetchMovieCast } from '../actions/movieCastAction';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const cast = [
	{
		id: 1,
		character: 'john doe1',
		name: 'foo1'
	},
	{
		id: 2,
		character: 'john doe2',
		name: 'foo2'
	},
	{
		id: 3,
		character: 'john doe3',
		name: 'foo3'
	}
];

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		cast: [],
		loading: true,
		error: false
	};
});

describe('movie cast', () => {

	it('cast list add', () => {

		const newState = movieCastReducer(state, castLoaded(cast));

		expect(newState.cast).toHaveLength(3);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	const movieId = 1;
	movieDatabaseService.transformMovieCredits = jest.fn(() => cast);

	it('fetch success', async () => {

		movieDatabaseService.getMovieCredits = jest.fn().mockResolvedValue(Promise.resolve(cast));

		await fetchMovieCast(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, castRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, castLoaded(cast));
	});

	it('fetch failure', async () => {

		movieDatabaseService.getMovieCredits = jest.fn().mockResolvedValue(Promise.reject());

		await fetchMovieCast(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, castRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, castError());
	});

});