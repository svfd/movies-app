import types from '../types';

const menuOpened = () => {
	return {
		type: types.MENU_OPENED
	};
};

const menuClosed = () => {
	return {
		type: types.MENU_CLOSED
	};
};

export {
	menuOpened,
	menuClosed
};