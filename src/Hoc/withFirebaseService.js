import React from 'react';
import { FirebaseServiceConsumer } from '../Context';

const withFirebaseService = (View) => {
	return (props) => {
		return (
			<FirebaseServiceConsumer>
				{(FirebaseService) => {
					return (
						<View {...props} FirebaseService={FirebaseService} />
					)
				}}
			</FirebaseServiceConsumer>
		);
	};
};

export default withFirebaseService;