import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Gallery from './Gallery.js';

describe('movie gallery', () => {

	const setup = () => {

		const gallery = [
			{src: 'image1'},
			{src: 'image2'},
			{src: 'image3'}
		];

		render(<Gallery gallery={gallery} />);

		const imageList = screen.getAllByAltText('frame of movie');
		const currentSlide = screen.getByText('1');
		const nextSlideHandler = screen.getByLabelText(/next slide/i);

		return {
			imageList,
			currentSlide,
			nextSlideHandler
		};
	};

	it('renders gallery', () => {

		const { imageList } = setup();

		expect(imageList).toHaveLength(3);
	});

	it('changes slide to next when button is clicked', () => {

		const { imageList, currentSlide, nextSlideHandler } = setup();

		expect(imageList).toHaveLength(3);
		expect(currentSlide).toHaveTextContent('1');

		userEvent.click(nextSlideHandler);

		expect(currentSlide).toHaveTextContent('2');
	});

});