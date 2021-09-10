import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Overlay from '@/components/Overlay';
import CrossButton from '@/components/CrossButton';
import MovieTrailersContainer from '@/containers/MovieTrailersContainer';

import './Wrapper.less';

const Wrapper = ({ onCloseTrailer }) => {
	return (
		<Fragment>
			<Overlay />
			<div className="trailer-wrapper">
				<CrossButton cb={onCloseTrailer}
											className="close-trailer"
											aria-label="Close the trailer"
				/>
				<MovieTrailersContainer />
			</div>
		</Fragment>
	);
};

Wrapper.propTypes = {
	onCloseTrailer: PropTypes.func.isRequired
};

export default Wrapper;