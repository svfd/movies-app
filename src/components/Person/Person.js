import React from 'react';
import PropTypes from 'prop-types';
import PersonCreditsContainer from '@/containers/PersonCreditsContainer';

import './Person.less';
import defaultActorImage from '@/assets/images/defaultActorImage.jpg';

const Person = ({ details }) => {

	const { image, name, biography, birthday, deathday, homepage, placeOfBirth } = details;

	return (
		<section className="person">
			<div className="container">
				<div className="person-details-wrapper">
					<article className="person-details">
						<img className="person-img" 
									src={image || defaultActorImage}
									width="150"
									height="150"
									alt={name}
						/>
						<div className="person-info-wrapper">
							<div className="person-name-wrap">
								<p className="person-name">
									{name}
								</p>
								<span className="person-birthdate">
									{birthday} {deathday && '- ' + deathday}
								</span>
							</div>
							<p className="person-biography">
								{biography}
							</p>
							<p className="person-birth-place">
								{placeOfBirth}
							</p>
							{homepage && 
								<a className="person-homepage"
										href={homepage}
										target="_blank"
										rel="noopener noreferrer"
								>
									Home page
								</a>
							}
						</div>
					</article>
					<PersonCreditsContainer />
				</div>
			</div>
		</section>
	);
};

Person.propTypes = {
	details: PropTypes.shape({
		image: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		biography: PropTypes.string,
		birthday: PropTypes.string,
		deathday: PropTypes.string,
		homePage: PropTypes.string,
		placeOfBirth: PropTypes.string
	})
};

export default Person;