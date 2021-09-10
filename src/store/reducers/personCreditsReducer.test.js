import personCreditsReducer from './personCreditsReducer.js';
import { personCreditsRequested, personCreditsLoaded, personCreditsError, fetchPersonCredits } from '../actions/personCreditsAction.js';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const cast = {
	results: [
		{
			id: 1,
			image: '',
			title: 'foo1',
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

	mockedDispatch.mockReset();

	state = {
		movies: [],
		loading: true,
		error: false
	};

});

describe('person credits', () => {

	const movieId = 1;

	movieDatabaseService.transformMovies = jest.fn(() => cast);

	it('credits added', () => {

		const newState = personCreditsReducer(state, personCreditsLoaded(cast));

		expect(newState.movies).toStrictEqual(cast.results);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('credits error', () => {

		const newState = personCreditsReducer(state, personCreditsError(cast.results));

		expect(newState.movies).toHaveLength(0);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeTruthy();
	});

	it('fetch credits success', async () => {

		movieDatabaseService.getPersonCredits = jest.fn().mockResolvedValue(Promise.resolve(cast));

		await fetchPersonCredits(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, personCreditsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, personCreditsLoaded(cast));
	});

	it('fetch credits failure', async () => {

		movieDatabaseService.getPersonCredits = jest.fn().mockResolvedValue(Promise.reject());

		await fetchPersonCredits(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, personCreditsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, personCreditsError());
	});

});