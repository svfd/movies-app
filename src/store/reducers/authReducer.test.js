import { FirebaseService } from '@/services';
import { setUserSession, signUp, signIn, signOut, authError, checkUserSession, resetAuthErrorMessage } from '../actions';
import authReducer from './authReducer.js';

jest.mock('@/services/FirebaseService');

const firebaseService = new FirebaseService();

const mockedDispatch = jest.fn();

let state = {};

const mockTime = 1487076708000;

beforeAll(() => jest.spyOn(Date, 'now').mockImplementation(() => mockTime));

afterAll(() => Date.now.mockRestore());

beforeEach(() => {

	mockedDispatch.mockReset();

	state = {
		isAuth: false,
		email: '',
		idToken: '',
		expiresIn: 0,
		localId: '',
		errorMessage: ''
	};

});

describe('auth', () => {

	const user = {
		email: 'test@test.test',
		password: '123456'
	};

	const result = {
		isAuth: true,
		email: user.email,
		idToken: 'foo',
		expiresIn: 3600,
		localId: 'baz',
		errorMessage: ''
	}

	it('sign up success', async () => {
	
		firebaseService.signUp = jest.fn().mockResolvedValue(Promise.resolve(result));

		await signUp(firebaseService)(user.email, user.password)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, resetAuthErrorMessage())
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, setUserSession({...result, expiresIn: Date.now() + result.expiresIn * 1000}));
	});

	it('sign in success', async () => {

		firebaseService.signIn = jest.fn().mockResolvedValue(Promise.resolve(result));

		await signIn(firebaseService)(user.email, user.passowrd)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, resetAuthErrorMessage());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, setUserSession({...result, expiresIn: Date.now() + result.expiresIn * 1000}));
	});

	it('sign out success', () => {

		const action = signOut();
		const newState = authReducer(state, action);

		expect(newState).toStrictEqual({
			isAuth: false,
			email: '',
			token: '',
			tokenExpires: 0,
			localId: '',
			errorMessage: ''
		});
		
	});

	it('sign in failure', async () => {

		firebaseService.signIn = jest.fn().mockResolvedValue(Promise.reject({message: 'Sign in error'}));
		const thunk = signIn(firebaseService);
		await thunk(user.email, user.password)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(2);
		expect(mockedDispatch).toHaveBeenNthCalledWith(1, resetAuthErrorMessage());
		expect(mockedDispatch).toHaveBeenNthCalledWith(2, authError('Sign in error'));
	});

	it('check user session with right token', async () => {

		firebaseService.getUserData = jest.fn().mockResolvedValue(Promise.resolve({users: [result]}));

		await checkUserSession(firebaseService)(result.idToken, result.expiresIn)(mockedDispatch);

		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(setUserSession(result));
	});

	it('check user session failure', async () => {

		firebaseService.getUserData = jest.fn().mockResolvedValue(Promise.reject('Token has been expired'));

		await checkUserSession(firebaseService)(result.idToken, result.expiresIn)(mockedDispatch);
		
		expect(mockedDispatch).toHaveBeenCalledTimes(1);
		expect(mockedDispatch).toHaveBeenCalledWith(signOut('Token has been expired'));
	});

});