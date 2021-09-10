import { routes, privateRoutes } from '../routes';

const routesMap = {};

const commonRoutes = [...routes, ...privateRoutes];

commonRoutes.forEach((route) => {
	const routeName = route.name[0].toLowerCase() + route.name.slice(1);
	routesMap[routeName] = route.path;
});

export default routesMap;