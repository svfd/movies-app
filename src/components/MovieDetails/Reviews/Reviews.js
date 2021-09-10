import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from '@/components/SectionTitle';

import defaultReviewAvatar from '@/assets/images/defaultReviewAvatar.svg';
import './Reviews.less';

const Reviews = ({ reviews }) => {

	const reviewsList = reviews.map(({ id, avatar, author, created, review }) => {
		return (
			<article key={id} className="movie-review">
				<div className="movie-review-author-data">
					<img className="movie-review-avatar" src={avatar || defaultReviewAvatar} alt={author} />
					<p>{author}</p>
				</div>
				<div className="movie-review-data">
					<span className="movie-review-timestamp">{created}</span>
					<p className="movie-review-content">{review}</p>
				</div>
			</article>
		);
	});

	return (
		<section className="movie-reviews">
			<div className="container">
				<SectionTitle title="Reviews" />
				{reviewsList}
			</div>
		</section>
	);
};

Reviews.propTypes = {
	reviews: PropTypes.array.isRequired
};

export default Reviews;