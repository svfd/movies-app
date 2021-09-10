import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { fetchMoviesGenres } from '@/store/actions';

import { routesMap, routeBuilder } from '@/routes';
import { withMovieDatabaseService } from '@/Hoc';

import MoviesFilter from '@/components/MoviesFilter';
import FilterRecord from '@/components/MoviesFilter/Record';
import FilterItem from '@/components/MoviesFilter/Item';

const FilterContainer = ({ fetchMoviesGenres, genres }) => {

	const [ currentElement, setCurrentElement ] = useState({type: '', isVisible: false});

	const { pathname } = useLocation();

	useEffect(() => {
		genres.length === 0 && fetchMoviesGenres();

		setCurrentElement({type: '', isVisible: false});
	}, [pathname]);

	const types = [
		{
			id: 'top_rated',
			name: 'Top rated'
		},
		{
			id: 'now_playing',
			name: 'Now playing'
		},
		{
			id: 'popular',
			name: 'Popular'
		},
		{
			id: 'upcoming',
			name: 'Upcoming'
		},
	];

	const renderTypes = () => {
		return types.map(({ id, name }) => {
			return <FilterRecord key={id} pathTo={routeBuilder(routesMap.browseByType, {id})} label={name} />
		});
	};

	const renderGenres = () => {
		return genres.map(({ id, name }) => {
			return <FilterRecord key={id} pathTo={routeBuilder(routesMap.browseByGenre, {id})} label={name} />
		});
	};

	const onChangeCurrentElement = (el) => {
		setCurrentElement({
			type: el.textContent,
			isVisible: currentElement.type === el.textContent && currentElement.isVisible ? false : true
		});
	};

	return (
		<MoviesFilter>
			<FilterItem title="Types" onChangeCurrentElement={onChangeCurrentElement} currentElement={currentElement}>
				{renderTypes()}
			</FilterItem>
			<FilterItem title="Genres" onChangeCurrentElement={onChangeCurrentElement} currentElement={currentElement}>
				{renderGenres()}
			</FilterItem>
		</MoviesFilter>
	);
};

const mapStateToProps = ({ genres: { genres } }) => {
	return {genres};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchMoviesGenres: fetchMoviesGenres(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps)
							)(FilterContainer);