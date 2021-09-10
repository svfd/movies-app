import React from 'react';
import PropTypes from 'prop-types';

import './MovieRating.less';

const MovieRating = ({ rating }) => {

	let ratingClassName = '';
	
	if (rating <= 3) {
		ratingClassName += 'red';
	} else if (rating <= 7) {
		ratingClassName += 'orange';
	} else if (rating <= 10) {
		ratingClassName += 'green';
	}

	return (
		<div className="movie-rating" aria-label="rating">
			<svg viewBox="0 0 36 36" className="movie-rating-circle-chart">
				<path className="movie-rating-circle-bg"
							d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<path className={`movie-rating-circle ${ratingClassName}`}
							strokeDasharray={`${rating * 10}, 100`}
							d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<text x="18" y="20.35" className="movie-rating-percentage">{rating}</text>
			</svg>
		</div>
	);
};

MovieRating.propTypes = {
	rating: PropTypes.number.isRequired
};

export default MovieRating;