import movieReviewsReducer from './movieReviewsReducer.js';
import { reviewsRequested, reviewsLoaded, reviewsError, fetchMovieReviews } from '../actions/movieReviewsAction.js';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const reviews = [
	{
		id: 1,
		author: 'foo1',
		avatar: 'bar1',
		rating: Infinity,
		review: 'lorem1',
		created: new Date().toDateString()
	},
	{
		id: 2,
		author: 'foo2',
		avatar: 'bar2',
		rating: Infinity,
		review: 'lorem2',
		created: new Date().toDateString()
	}
];

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		reviews: [],
		loading: true,
		error: false
	};

});

describe('movie reviews', () => {

	const movieId = 1;

	it('reviews added', () => {

		const newState = movieReviewsReducer(state, reviewsLoaded(reviews));
		
		expect(newState.reviews).toStrictEqual(reviews);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('fetch reviews success', async () => {

		movieDatabaseService.getMovieReviews = jest.fn().mockResolvedValue(Promise.resolve(reviews));
		movieDatabaseService.transformMovieReviews = jest.fn(() => reviews);

		await fetchMovieReviews(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, reviewsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, reviewsLoaded(reviews));
	});

	it('fetch reviews faulure', async () => {

		movieDatabaseService.getMovieReviews = jest.fn().mockResolvedValue(Promise.reject());

		await fetchMovieReviews(movieDatabaseService)(movieId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, reviewsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, reviewsError());
	});

});