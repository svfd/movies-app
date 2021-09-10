import {
	BrowseByTypePage,
	BrowseByGenrePage,
	MoviePage,
	SearchPage,
	PersonPage,
	AuthPage,
	HomePage
} from '../Pages';

const routes = [
	{
		name: 'BrowseByType',
		path: '/movies/:filter?/:page?',
		component: BrowseByTypePage
	},
	{
		name: 'BrowseByGenre',
		path: '/genres/:filter?/:page?',
		component: BrowseByGenrePage
	},
	{
		name: 'Movie',
		path: '/movie/:id',
		component: MoviePage
	},
	{
		name: 'Search',
		path: '/search',
		component: SearchPage
	},
	{
		name: 'Person',
		path: '/person/:id',
		component: PersonPage
	},
	{
		name: 'Auth',
		path: '/auth',
		component: AuthPage
	},
	{
		name: 'Home',
		path: '/',
		component: HomePage,
	}
];

export default routes;