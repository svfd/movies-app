import React from 'react';
import PropTypes from 'prop-types';

import searchBarIcon from './SearchBarIcon.svg';
import './SearchBar.less';

const SearchBar = ({ onInputChange, onFormSubmit, value, isValid }) => {
	return (
		<form className="search-bar" onSubmit={onFormSubmit}>
			<p className="search-bar-field-wrap">
				<input className={`search-bar-field ${isValid === false ? 'search-bar-field-invalid' : ''}`}
								type="text"
								placeholder="type a movie name e.g Scooby Doo"
								value={value}
								onChange={(evt) => onInputChange(evt.target.value)}
				/>
				<button className="search-bar-button" aria-label="Search button">
					<img className="search-bar-icon" src={searchBarIcon} alt="search bar icon"/>
				</button>
			</p>
		</form>
	);
};

SearchBar.propTypes = {
	onInputChange: PropTypes.func.isRequired,
	onFormSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	isValid: PropTypes.bool
};

export default SearchBar;