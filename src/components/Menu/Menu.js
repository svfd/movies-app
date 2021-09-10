import React from 'react';
import PropTypes from 'prop-types';

import CrossButton from '../CrossButton';
import Navigation from '../Navigation';
import AuthContainer from '@/containers/AuthContainer';

import './Menu.less';

const Menu = ({ isOpen, onMenuClose }) => {

	let menuClass = isOpen ? 'menu-wrapper-active' : '';

	return (
		<div className={`menu-wrapper ${menuClass}`}>
			<CrossButton cb={onMenuClose}
										className="close-menu"
										aria-label="close menu"
			/>
			<Navigation />
			<AuthContainer />
		</div>
	);
};

Menu.propTypes= {
	isOpen: PropTypes.bool.isRequired,
	onMenuClose: PropTypes.func.isRequired
};

export default Menu;