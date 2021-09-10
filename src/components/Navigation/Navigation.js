import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.less';

const Navigation = () => {
	return (
		<nav className="navigation">
			<ul className="navigation-list">
				<li className="navigation-item">
					<Link className="navigation-link" to="/movies">Movies</Link>
				</li>
				<li className="navigation-item">
					<Link className="navigation-link" to="/watchlist">Watchlist</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;