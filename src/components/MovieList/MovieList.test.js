import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import MovieList from './MovieList.js';;

describe('movie list', () => {

	it('renders empty movie list', () => {

		render(<MovieList data={[]} />);

		expect(screen.getByText(/Movie list is empty/i)).toBeInTheDocument();
		expect(screen.queryAllByRole('article')).toHaveLength(0);
	});

	it('renders movie list', () => {

		const data = [
			{
				id: 1,
				image: '1',
				title: 'movie1'
			},
			{
				id: 2,
				image: '2',
				title: 'movie2'
			}
		];

		render(
			<Router>
				<MovieList data={data} />
			</Router>
		);

		expect(screen.queryByText(/Movie list is empty/i)).not.toBeInTheDocument();
		expect(screen.getAllByRole('article')).toHaveLength(2);
	});

});