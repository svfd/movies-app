import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import './Logo.less';

const Logo = () => {
	return (
		<Link className="logo-link" to="/">
			<img className="logo-img" src={logo} width="25" height="25" alt="popcorn busket with glasses" />
		</Link>
	);
};

export default Logo;