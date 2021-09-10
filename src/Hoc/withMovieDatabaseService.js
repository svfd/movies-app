import React from 'react';
import { MovieDatabaseConsumer } from '../Context';

const withMovieDatabaseService = (View) => {
	return (props) => {
		return (
			<MovieDatabaseConsumer>
				{(MovieDatabaseService) => {
					return (
						<View {...props}
							MovieDatabaseService={MovieDatabaseService}
						/>
					);
				}}
			</MovieDatabaseConsumer>
		);
	};
};

export default withMovieDatabaseService;