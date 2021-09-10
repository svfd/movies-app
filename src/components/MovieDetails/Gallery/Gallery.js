import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import SectionTitle from '@/components/SectionTitle';

import './Gallery.less';

const Gallery = ({ gallery }) => {

	const images = gallery.map(({ src }) => ({
		original: src,
		originalWidth: '200',
		originalHeight: '150',
		originalAlt: 'frame of movie'
	}));

	return (
		<section className="movie-gallery">
			<div className="container">
				<SectionTitle title="Gallery of images" />
				<ImageGallery items={images}
											infinite={false}
											showPlayButton={false}
											additionalClass="movie-gallery-swiper"
											showIndex
				/>
			</div>
		</section>
	);
};

Gallery.propTypes = {
	gallery: PropTypes.array.isRequired
};

export default Gallery;