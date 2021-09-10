import React from 'react';
import PropTypes from 'prop-types';
import { routesMap, routeBuilder } from '@/routes';

import SectionTitle from '../SectionTitle';
import MoviesWrapper from '../MoviesWrapper';
import MovieItem from '../MovieItem';

import './MovieList.less';

const MovieList = ({ data, title }) => {

	const items = data.map(( {id, ...props} ) => {
		return (
			<MovieItem key={id} {...props} pathTo={routeBuilder(routesMap.movie, {id})} />
		);
	});

	let content = <SectionTitle title="Movie list is empty" />;

	if (items.length !== 0) {
		content = items;
	}

	return (
		<section className="movie-list">
			<div className="container">
				{title && <SectionTitle title={title} />}
				<MoviesWrapper>
					{content}
				</MoviesWrapper>
			</div>
		</section>
	);
};

MovieList.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string
};

export default MovieList;