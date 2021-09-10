import movieImagesReducer from './movieImagesReducer.js';
import { imagesRequested, imagesLoaded, imagesError, fetchMovieImages } from '../actions/movieImagesAction';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const images = [
	{
		src: '',
		width: 150,
		height: 150
	},
	{
		src: '',
		width: 200,
		height: 200
	}
];

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		gallery: [],
		loading: true,
		error: false
	};

});

describe('movie images', () => {

	const movieId = 1;

	it('added images', () => {

		const newState = movieImagesReducer(state, imagesLoaded(images));

		expect(newState.gallery).toStrictEqual(images);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('fetch images success', async () => {

		movieDatabaseService.getMovieImages = jest.fn().mockResolvedValue(Promise.resolve(images));
		movieDatabaseService.transformMovieImages = jest.fn(() => images);

		await fetchMovieImages(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, imagesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, imagesLoaded(images));
	});

	it('fetch images failure', async () => {

		movieDatabaseService.getMovieImages = jest.fn().mockResolvedValue(Promise.reject());

		await fetchMovieImages(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, imagesRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, imagesError());
	});

});