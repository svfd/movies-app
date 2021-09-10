import React from 'react';
import PropTypes from 'prop-types';

import { routesMap, routeBuilder } from '@/routes';

import MoviesWrapper from '../MoviesWrapper';
import MovieItem from '../MovieItem';
import SectionTitle from '../SectionTitle';
import CrossButton from '../CrossButton';

import './WatchList.less';

const WatchList = ({ watchlist, onRemoveMovie }) => {

	const movies = watchlist.map(({ id, title, ...data }) => {
		return (
			<div key={id} className="watchlist-items-wrapper">
				<MovieItem pathTo={routeBuilder(routesMap.movie, {id})}
										title={title}
										{...data}
				/>
				<CrossButton cb={() => onRemoveMovie(id)}
											aria-label={`Remove ${title} from watchlist`}
				/>
			</div>
		);
	});

	let title = watchlist.length === 0 && <SectionTitle title="Watch list is empty" />;
	let content = watchlist.length !== 0 && movies;

	return (
		<section className="watchlist">
			<div className="container">
				{title}
				<MoviesWrapper>
					{content}
				</MoviesWrapper>
			</div>
		</section>
	);
};

WatchList.propTypes = {
	watchlist: PropTypes.array.isRequired,
	onRemoveMovie: PropTypes.func.isRequired
};

export default WatchList;