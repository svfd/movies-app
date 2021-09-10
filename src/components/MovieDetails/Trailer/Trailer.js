import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import SectionTitle from '@/components/SectionTitle';

import './Trailer.less';

const Trailer = ({ trailers }) => {

	const renderFrame = (trailer) => {
		return (
			<iframe className="movie-trailer-item"
							key={trailer.id}
							src={trailer.url}
							title={trailer.name}
							width="280"
							height="140"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
			></iframe>
		);
	};

	const trailerList = trailers.map((trailer) => ({
		emdedUrl: trailer.url,
		renderItem: renderFrame.bind(null, trailer)
	}));

	return (
		<section className="movie-trailer">
			{trailers.length > 0 ? 
				<ImageGallery items={trailerList}
											infinite={false}
											showPlayButton={false}
											showFullscreenButton={false}
											additionalClass="movie-trailer-gallery"
											showIndex
											lazyLoad
				/>
			:
				<SectionTitle title="Trailers were not found!" />
			}
		</section>
	);
};

Trailer.propTypes = {
	trailers: PropTypes.array.isRequired
};

export default Trailer;