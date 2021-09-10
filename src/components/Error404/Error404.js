import React from 'react';
import { Link } from 'react-router-dom';

import error404Img from './error404.svg';
import './Error404.less';

const Error404 = () => {
	return (
		<div className="container">
			<div className="error404">
				<h2 className="error404-title">Wrong turn</h2>
				<img className="error404-image" src={error404Img} alt="Error 404" />
				<Link className="error404-link" to="/">Back to the movies page</Link>
			</div>
		</div>
	);
};

export default Error404;