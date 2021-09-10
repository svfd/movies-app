import React from 'react';
import { Redirect } from 'react-router-dom';

const HomePage = () => {

	return <Redirect to="/movies" />
	
	return (
		<main>
			<div className="container">
				<h1>Home page</h1>
			</div>
		</main>
	)
};

export default HomePage;