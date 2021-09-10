import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { routesMap, routeBuilder } from '@/routes';
import SectionTitle from '@/components/SectionTitle';

import './Cast.less';
import defaultActorImage from '@/assets/images/defaultActorImage.jpg';

const Cast = ({ cast }) => {

	const castList = cast.map(({ id, name, image, character }) => {
		return (
			<article key={id + character} className="movie-actor">
				<img className="movie-actor-img" src={image || defaultActorImage} width="250" height="375" alt={name} />
				<div className="movie-actor-data">
					<p className="movie-actor-name">
						<Link className="movie-actor-link" to={routeBuilder(routesMap.person, {id})}>{name}</Link>
					</p>
					<p className="movie-actor-role">as: {character || 'unknown'}</p>
				</div>
			</article>
		);
	});

	return (
		<section className="movie-actors">
			<div className="container">
				<SectionTitle title="Movie cast" />
				<div className="movie-actors-wrapper">
					{castList}
				</div>
			</div>
		</section>
	);
};

Cast.propTypes = {
	cast: PropTypes.array.isRequired
};

export default Cast;