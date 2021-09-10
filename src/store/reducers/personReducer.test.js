import personDetailsReducer from './personReducer.js';
import { personDetailsRequested, personDetailsLoaded, personDetailsError, fetchPersonDetails } from '../actions/personAction';
import { MovieDatabaseService } from '@/services';

jest.mock('@/services/MovieDatabaseService.js');

const movieDatabaseService = new MovieDatabaseService();

const mockedDispatch = jest.fn();

let state = {};

const details = {
	id: 1,
	name: 'john doe',
	image: '',
	biography: 'lorem',
	birthday: new Date(),
	deathday: new Date() + 1200,
	placeOfBirth: 'foo',
};

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		details: {},
		loading: true,
		error: false
	};

});

describe('person details', () => {

	it('details added', () => {

		const newState = personDetailsReducer(state, personDetailsLoaded(details));

		expect(newState.details).toStrictEqual(details);
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeFalsy();
	});

	it('details error', () => {

		const newState = personDetailsReducer(state, personDetailsError());

		expect(newState.details).toStrictEqual({});
		expect(newState.loading).toBeFalsy();
		expect(newState.error).toBeTruthy();
	});

	const personId = 1;

	movieDatabaseService.transformPersonDetails = jest.fn(() => details);

	it('fetch details success', async () => {

		movieDatabaseService.getPersonDetails = jest.fn().mockResolvedValue(Promise.resolve(details));

		await fetchPersonDetails(movieDatabaseService)(personId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, personDetailsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, personDetailsLoaded(details));
	});

	it('fetch details failure', async () => {

		movieDatabaseService.getPersonDetails = jest.fn().mockResolvedValue(Promise.reject());

		await fetchPersonDetails(movieDatabaseService)(personId)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, personDetailsRequested());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, personDetailsError());
	});

});
