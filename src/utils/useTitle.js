import { useEffect } from 'react';

const useTitle = (title = '') => {
	useEffect(() => {
		const prevTitle = document.title;

		const _title = `Movies app - ${title}`;
		document.title = _title

		return () => document.title = prevTitle;
	});
};

export default useTitle;