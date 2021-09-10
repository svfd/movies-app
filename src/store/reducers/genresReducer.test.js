import genresReducer from './genresReducer.js';
import { genresRequested, genresLoaded, genresError, fetchMoviesGenres } from '../actions/genresAction.js';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		genres: [],
		loading: true,
		error: false
	};

});

describe('genres', () => {

	const genres = [
		{
			id: 1,
			name: 'Fantasy'
		},
		{
			id: 2,
			name: 'Horror'
		}
	];

	it('genres loaded', () => {

		const newState = genresReducer(state, genresLoaded({genres}));

		expect(newState.genres).toStrictEqual(genres);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('genres error', () => {

		const newState = genresReducer(state, genresError());

		expect(newState.genres).toHaveLength(0);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeTruthy();
	});

	it('fetch genres success', async () => {

		movieDatabaseService.getMoviesGenres = jest.fn().mockResolvedValue(Promise.resolve(genres));

		await fetchMoviesGenres(movieDatabaseService)()(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, genresRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, genresLoaded(genres));
	});

	it('fetch genres failure', async () => {

		movieDatabaseService.getMoviesGenres = jest.fn().mockResolvedValue(Promise.reject());

		await fetchMoviesGenres(movieDatabaseService)()(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, genresRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, genresError());
	});

});