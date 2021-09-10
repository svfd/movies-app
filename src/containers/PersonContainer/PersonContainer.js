import React from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { fetchPersonDetails } from '@/store/actions';
import { withMovieDatabaseService, withData } from '@/Hoc';
import { useTitle } from '@/utils';

import Person from '@/components/Person';

const PersonContainer = ({ details }) => {

	useTitle(details.name);

	return <Person details={details} />
};

const mapParamsToUseEffect = () => {
	const { id } = useParams();
	return [id];
};

const mapStateToProps = ({ person: { details, loading, error } }) => {
	return {details, loading, error};
};

const mapDispatchToProps = (dispatch, { MovieDatabaseService }) => {
	return bindActionCreators({
		fetchData: fetchPersonDetails(MovieDatabaseService)
	}, dispatch);
};

export default compose(
								withMovieDatabaseService,
								connect(mapStateToProps, mapDispatchToProps),
								withData(mapParamsToUseEffect)
							)(PersonContainer);