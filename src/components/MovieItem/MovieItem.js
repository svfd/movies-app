import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import defaultMovieImage from '@/assets/images/defaultMovieImage.jpg';
import './MovieItem.less';

const MovieItem = ({ pathTo, image, title }) => {
	return (
		<article className="movie-list-item">
			<Link to={pathTo} aria-label={`go to movie ${title}`}>
				<img className="movie-list-item-img" src={image || defaultMovieImage} width="150" height="225" alt={title} />
				<p className="movie-list-item-name" aria-hidden="true">{title}</p>
			</Link>
		</article>
	);
};

MovieItem.propTypes = {
	pathTo: PropTypes.string.isRequired,
	image: PropTypes.string,
	title: PropTypes.string.isRequired
};

export default MovieItem;