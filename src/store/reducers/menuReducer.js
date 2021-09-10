import types from '../types';

const updateMenu = (state, action) => {

	if (state === undefined) {
		return {
			isOpen: false
		};
	}

	switch(action.type) {
		case types.MENU_OPENED:
			return {
				isOpen: true
			};
		case types.MENU_CLOSED:
			return {
				isOpen: false
			};
		default:
			return {
				...state
			};
	}

};

export default updateMenu;