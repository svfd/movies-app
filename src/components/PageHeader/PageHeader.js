import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import SearchBarContainer from '@/containers/SearchBarContainer';
import BurgerButton from './BurgerButton';
import Menu from '../Menu';

import './PageHeader.less';

const PageHeader = ({ isOpen, onMenuOpen, onMenuClose }) => {
	return (
		<header className="page-header">
			<div className="container">
				<div className="page-header-wrapper">
					<Logo />
					<SearchBarContainer />
					<BurgerButton onMenuOpen={onMenuOpen} />
					<Menu isOpen={isOpen} onMenuClose={onMenuClose} />
				</div>
			</div>
		</header>
	);
};

PageHeader.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onMenuOpen: PropTypes.func.isRequired,
	onMenuClose: PropTypes.func.isRequired
};

export default PageHeader;