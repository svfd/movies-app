import React from 'react';
import PropTypes from 'prop-types';

import './BurgerButton.less';

const BurgerButton = ({ onMenuOpen }) => {
	return (
		<button className="burger-button"
						aria-label="Open menu"
						onClick={onMenuOpen}
		>
		</button>
	);
};

BurgerButton.propTypes = {
	onMenuOpen: PropTypes.func.isRequired
};

export default BurgerButton;