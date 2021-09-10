import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar.js';

describe('search bar', () => {

	const setup = () => {

		const mockedOnInputChange = jest.fn();
		const mockedOnFormSubmit = jest.fn((evt) => evt.preventDefault());

		render(
			<SearchBar onInputChange={mockedOnInputChange} 
									onFormSubmit={mockedOnFormSubmit}
			/>
		);

		const input = screen.getByRole('textbox');
		const submitHandler = screen.getByRole('button');

		return {
			input,
			submitHandler,
			mockedOnInputChange,
			mockedOnFormSubmit
		};

	};

	it('renders search bar', () => {

		const { input, submitHandler } = setup();
		
		expect(input).toBeInTheDocument();
		expect(input).not.toHaveValue();
		expect(submitHandler).toBeInTheDocument();
	});

	it('sends query', () => {

		const { input, submitHandler, mockedOnInputChange, mockedOnFormSubmit } = setup();

		userEvent.type(input, 'movie name');

		expect(input).toHaveValue('movie name');

		userEvent.click(submitHandler);

		expect(mockedOnInputChange).toHaveBeenCalledTimes(10);
		expect(mockedOnFormSubmit).toHaveBeenCalledTimes(1);
	});

});