import menuReducer from './menuReducer.js';
import { menuOpened, menuClosed } from '../actions';

describe('menu', () => {

	it('opened menu', () => {
	
		const state = {isOpen: false};
	
		const action = menuOpened();
		const newState = menuReducer(state, action);
	
		expect(newState.isOpen).toBeTruthy();
	});
	
	it('closed menu', () => {
	
		const state = {isOpen: true};
	
		const action = menuClosed();
		const newState = menuReducer(state, action);
		
		expect(newState.isOpen).toBeFalsy();
	});

});