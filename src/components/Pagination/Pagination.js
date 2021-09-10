import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Pagination.less';

const Pagination = ({ pages, currentPage, pathTo, visiblePages = 10 }) => {

	if (pages === 1) {
		return null;
	}

	if (pages < visiblePages) {
		visiblePages = pages;
	}

	currentPage = parseInt(currentPage);

	let leftSide = Math.floor(currentPage - visiblePages / 2);
	let rightSide = Math.floor(currentPage + visiblePages / 2) - 1;

	if (leftSide < 1) {
		leftSide = 1;
		rightSide = visiblePages;
	}

	if (rightSide >= pages) {
		rightSide = pages;
		leftSide = rightSide - visiblePages + 1;
	}

	const pagesList = [];

	const getCurrentPageClassName = (i) => {
		return i === currentPage ? 'pagination-link-current' : '';
	}

	for (let i = leftSide; i <= rightSide; i++) {
		pagesList.push(
			<Link key={i} to={`${pathTo}${i}`}
						className={`pagination-link ${getCurrentPageClassName(i)}`}
			>
				{i}
			</Link>
		);
	}

	return (
		<section className="pagination">
			{pagesList}
		</section>
	);
};

Pagination.propTypes = {
	pages: PropTypes.number.isRequired,
	currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pathTo: PropTypes.string.isRequired,
	visiblePages: PropTypes.number
};

export default Pagination;