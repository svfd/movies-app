import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Item.less';

const Item = ({ title, onChangeCurrentElement, currentElement, children }) => {

	const { type, isVisible } = currentElement;

	let toggleClassName = 'filter-toggle';

	if (type === title && isVisible) {
		toggleClassName += ' filter-toggle-active';
	}

	return (
		<Fragment>
			<button className={toggleClassName}
								onClick={(evt) => onChangeCurrentElement(evt.target)}
				>
					{title}
				</button>
				{ type === title && isVisible &&
					<div className="filter-items-wrapper">
						{
							React.Children.map(children, (child) => {
								return React.cloneElement(child);
							})
						}
					</div>
				}
		</Fragment>
	);

};

Item.propTypes = {
	title: PropTypes.string.isRequired,
	onChangeCurrentElement: PropTypes.func.isRequired,
	currentElement: PropTypes.shape({
		type: PropTypes.string.isRequired,
		isVisible: PropTypes.bool.isRequired
	}).isRequired,
	children: PropTypes.node.isRequired
};

export default Item;