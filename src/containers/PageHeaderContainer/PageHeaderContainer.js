import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { menuOpened, menuClosed } from '@/store/actions';

import PageHeader from '@/components/PageHeader';

const PageHeaderContainer = ({ onMenuOpen, onMenuClose, isOpen }) => {

	const { pathname } = useLocation();

	useEffect(() => {
		onMenuClose();
	}, [pathname]);

	return (
		<PageHeader	isOpen={isOpen}
								onMenuOpen={onMenuOpen}
								onMenuClose={onMenuClose}
		/>
	);
};

const mapStateToProps = ({ menu: { isOpen } }) => {
	return {isOpen};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onMenuOpen: menuOpened,
		onMenuClose: menuClosed
	}, dispatch);
};

export default connect(
								mapStateToProps, mapDispatchToProps
							)(PageHeaderContainer);