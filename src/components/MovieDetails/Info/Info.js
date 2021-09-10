import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { timeConvert } from '@/utils';
import { routesMap, routeBuilder } from '@/routes';

import MovieRating from '@/components/MovieRating';

import defaultMovieBackground from '@/assets/images/defaultMovieBackground.jpg';
import defaultMovieImage from '@/assets/images/defaultMovieImage.jpg';
import emptyHeart  from './emptyHeart.svg';
import fillHeart from './fillHeart.svg';

import './Info.less';

const Info = ({ info, isFavorite, onShowTrailer, onChangeWatchList }) => {

	const {
		image, title,
		tagline, description, releaseDate,
		duration, countries, budget,
		genres, rating, status, backdrop
	} = info;

	const icon = isFavorite ? fillHeart : emptyHeart;

	return (
		<section className="movie">
			<div className="movie-backdrop" style={{backgroundImage: `url(${backdrop || defaultMovieBackground})`}} aria-hidden="true"></div>
			<div className="container">
				<article className="movie-item">
					<div className="movie-info-wrapper">
						<img className="movie-poster" src={image || defaultMovieImage} width="300" height="450" alt={`poster of movie ${title}`} />
						<div className="movie-info">
							<div className="movie-title-wrapper">
								{title && <h2 className="movie-title">{title}</h2>}
								<button className="movie-watchlist-button" 
												onClick={onChangeWatchList}
												aria-label={isFavorite ? 'Remove from the watchlsit' : 'Add to the watchlist'}
								>
									<img src={icon} alt="Heart icon" />
								</button>
							</div>
							<button className="movie-play-trailer"
											onClick={onShowTrailer}
								>Play trailer
							</button>
							{tagline && <p className="movie-tagline" aria-label="tagline">{tagline}</p>}
							{countries && <p className="movie-countries" aria-label="list of countries">{countries.join(', ')}</p>}
							{description && <p className="movie-description" aria-label="description">{description}</p>}
							<div className="movie-genres">
								{genres && genres.map(({ id, name }) => {
									return <Link key={id}
																className="movie-genre"
																to={routeBuilder(routesMap.browseByGenre, {id})}
																aria-label={`go to genre ${name}`}
									>{name}
									</Link>
								})}
							</div>
							{status && <span className="movie-status" aria-label="movie status">{status}</span>}
							<div className="movie-addition-info-wrapper">
								{<span className="movie-release-date" aria-label="movie release date">{releaseDate}</span>}
								{<span className="movie-duration" aria-label="movie duration">{timeConvert(duration)}</span>}
								{<span className="movie-budget" aria-label="movie budget">${budget}</span>}
								<MovieRating rating={rating} />
							</div>
						</div>
					</div>
				</article>
			</div>
		</section>
	);
};

Info.propTypes = {
	info: PropTypes.shape({
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		tagline: PropTypes.string,
		description: PropTypes.string,
		releaseDate: PropTypes.string,
		duration: PropTypes.number,
		countries: PropTypes.array,
		budget: PropTypes.number,
		genres: PropTypes.array,
		rating: PropTypes.number,
		status: PropTypes.string
	}),
	isFavorite: PropTypes.bool.isRequired,
	onChangeWatchList: PropTypes.func.isRequired
};

export default Info;