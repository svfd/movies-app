import moviesReducer from './moviesReducer.js';
import { moviesRequested, moviesLoaded, moviesError, fetchMoviesByType, fetchMoviesByGenre, searchMovies } from '../actions/moviesAction.js';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const movieList = {
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
	mockedDispatch.mockReset();

	state = {
		movies: [],
		pages: 0,
		loading: true,
		error: null
	};

});

describe('movies', () => {

	const movieParams = {
		type: 'action',
		genreId: 3,
		keyword: 'foo',
		page: 1
	};

	it('movies added', () => {

		const newState = moviesReducer(state, moviesLoaded(movieList));

		expect(newState.movies).toStrictEqual(movieList.results);
		expect(newState.pages).toBe(movieList.pages);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('movies error', () => {

		const newState = moviesReducer(state, moviesError());
		
		expect(newState.movies).toHaveLength(0);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeTruthy();
	});

	movieDatabaseService.transformMovies = jest.fn(() => movieList);

	it('fetch movies by type success', async () => {

		movieDatabaseService.getMoviesByType = jest.fn().mockResolvedValue(Promise.resolve(movieList));

		await fetchMoviesByType(movieDatabaseService)(movieParams.type, movieParams.page)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, moviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, moviesLoaded(movieList));
	});

	it('fetch movies by type failure', async () => {

		movieDatabaseService.getMoviesByType = jest.fn().mockResolvedValue(Promise.reject());

		await fetchMoviesByType(movieDatabaseService)(movieParams.type, movieParams.page)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, moviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, moviesError());
	});

	it('fetch movies by genre success', async () => {

		movieDatabaseService.getMoviesByGenre = jest.fn().mockResolvedValue(Promise.resolve(movieList));
		
		await fetchMoviesByGenre(movieDatabaseService)(movieParams.genreId, movieParams.page)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, moviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, moviesLoaded(movieList));
	});

	it('fetch movies by genre failure', async () => {

		movieDatabaseService.getMoviesByGenre = jest.fn().mockResolvedValue(Promise.reject());

		await fetchMoviesByGenre(movieDatabaseService)(movieParams.genreId, movieParams.page)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, moviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, moviesError());
	});

	it('search movies success', async () => {

		movieDatabaseService.searchMoviesByKeyword = jest.fn().mockResolvedValue(Promise.resolve(movieList));
		
		await searchMovies(movieDatabaseService)(movieParams.keyword, movieParams.page)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, moviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, moviesLoaded(movieList));
	});

	it('search movies failure', async () => {

		movieDatabaseService.searchMoviesByKeyword = jest.fn().mockResolvedValue(Promise.reject());

		await searchMovies(movieDatabaseService)(movieParams.keyword, movieParams.page)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, moviesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, moviesError());
	});

});